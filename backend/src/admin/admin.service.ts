import { 
  BadRequestException, 
  ConflictException, 
  Injectable, 
  NotFoundException, 
  InternalServerErrorException 
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ADMIN_TABLES, TableConfig } from './admin.tables';

type DataPayload = Record<string, any>;

@Injectable()
export class AdminService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Zentraler SQL-Error Handler
   */
  private handleSqlError(error: any, table: string) {
    // PostgreSQL Error Codes: https://www.postgresql.org/docs/current/errcodes-appendix.html
    
    switch (error.code) {
      case '23505': // Unique Violation
        throw new ConflictException(`Eintrag in '${table}' existiert bereits (Unique Constraint verletzt). Detail: ${error.detail}`);
      
      case '23503': // Foreign Key Violation
        throw new BadRequestException(`Fremdschlüssel-Fehler in '${table}': Eine verknüpfte Ressource existiert nicht. Detail: ${error.detail}`);
      
      case '23502': // Not Null Violation
        throw new BadRequestException(`Pflichtfeld fehlt in '${table}': ${error.column} darf nicht leer sein.`);
      
      case '42703': // Undefined Column
        throw new BadRequestException(`Spaltenfehler: Eine der angegebenen Spalten existiert nicht in '${table}'.`);

      default:
        // Wenn es kein bekannter DB-Fehler ist, werfen wir einen 500er
        throw new InternalServerErrorException(`Datenbankfehler bei Tabelle '${table}': ${error.message}`);
    }
  }

  private getTableConfig(table: string): TableConfig {
    const config = ADMIN_TABLES[table];
    if (!config) {
      throw new BadRequestException(`Table '${table}' is not registered for admin access.`);
    }
    return config;
  }

  // --- CRUD Operationen mit Error Handling ---

  async findAll(table: string, limit = 100, offset = 0) {
    this.getTableConfig(table);
    const safeLimit = Math.min(Math.max(limit, 1), 500);
    const safeOffset = Math.max(offset, 0);

    try {
      return await this.dataSource.query(
        `SELECT * FROM "${table}" ORDER BY 1 LIMIT $1 OFFSET $2`,
        [safeLimit, safeOffset],
      );
    } catch (e) {
      this.handleSqlError(e, table);
    }
  }

  async create(table: string, payload: DataPayload) {
    const { columns } = this.getTableConfig(table);
    const allowedData = this.filterFields(payload, columns);
    const keys = Object.keys(allowedData);

    if (keys.length === 0) throw new BadRequestException('No valid columns provided.');

    const colNames = keys.map(k => `"${k}"`).join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const values = keys.map(k => allowedData[k]);

    try {
      const sql = `INSERT INTO "${table}" (${colNames}) VALUES (${placeholders}) RETURNING *`;
      const result = await this.dataSource.query(sql, values);
      return result[0];
    } catch (e) {
      this.handleSqlError(e, table);
    }
  }

  async update(table: string, identifiers: DataPayload, payload: DataPayload) {
    const { keys, columns } = this.getTableConfig(table);
    const { values: whereValues } = this.buildWhere(keys, identifiers);

    const updateableCols = columns.filter(c => !keys.includes(c));
    const allowedData = this.filterFields(payload, updateableCols);
    const updateKeys = Object.keys(allowedData);

    if (updateKeys.length === 0) throw new BadRequestException('No valid fields for update.');

    const setClause = updateKeys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');
    const values = [...updateKeys.map(k => allowedData[k]), ...whereValues];
    
    const finalWhere = keys
      .map((k, i) => `"${k}" = $${updateKeys.length + i + 1}`)
      .join(' AND ');

    try {
      const sql = `UPDATE "${table}" SET ${setClause} WHERE ${finalWhere} RETURNING *`;
      const result = await this.dataSource.query(sql, values);
      if (!result.length) throw new NotFoundException('Record not found');
      return result[0];
    } catch (e) {
      this.handleSqlError(e, table);
    }
  }

  async remove(table: string, identifiers: DataPayload) {
    const { keys } = this.getTableConfig(table);
    const { clause, values } = this.buildWhere(keys, identifiers);

    try {
      const sql = `DELETE FROM "${table}" WHERE ${clause} RETURNING *`;
      const result = await this.dataSource.query(sql, values);
      if (!result.length) throw new NotFoundException('Record not found');
      return result[0];
    } catch (e) {
      this.handleSqlError(e, table);
    }
  }

  // --- Private Helpers ---

  private filterFields(data: DataPayload, allowed: string[]): DataPayload {
    return Object.keys(data)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});
  }

  private buildWhere(requiredKeys: string[], input: DataPayload) {
    const values: any[] = [];
    const clauses = requiredKeys.map((key, i) => {
      if (input[key] === undefined) throw new BadRequestException(`Missing identifier: ${key}`);
      values.push(input[key]);
      return `"${key}" = $${i + 1}`;
    });
    return { clause: clauses.join(' AND '), values };
  }
}