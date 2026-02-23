import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { CreateHotelImageDto } from './dto/create-hotel-image.dto';
import { UpdateHotelImageDto } from './dto/update-hotel-image.dto';

@Injectable()
export class HotelService {
  constructor(private readonly dataSource: DataSource) {}

  // -------- Hotel --------

  async findAll() {
    return this.dataSource.query(
      `SELECT * FROM hotel ORDER BY hotel_id`,
    );
    // Optional später: join auf erstes Bild + avg Bewertung etc.
  }

  async findOne(hotelId: number) {
    const rows = await this.dataSource.query(
      `SELECT * FROM hotel WHERE hotel_id = $1`,
      [hotelId],
    );
    if (rows.length === 0) throw new NotFoundException('Hotel not found');
    return rows[0];
  }

  async create(dto: CreateHotelDto) {
    const rows = await this.dataSource.query(
      `
      INSERT INTO hotel (
        besitzer_id, name, beschreibung, hotelsterne,
        land, strasse, plz, ort,
        stornogebuehr_prozent, kostenlos_stornierbar_bis_stunden
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *
      `,
      [
        dto.besitzer_id,
        dto.name,
        dto.beschreibung,
        dto.hotelsterne,
        dto.land,
        dto.strasse,
        dto.plz,
        dto.ort,
        dto.stornogebuehr_prozent,
        dto.kostenlos_stornierbar_bis_stunden,
      ],
    );
    return rows[0];
  }

    async update(hotelId: number, dto: UpdateHotelDto) {
        // 1. Filtern: Nur Felder nehmen, die nicht 'undefined' sind
        const entries = Object.entries(dto).filter(([, v]) => v !== undefined);
        if (entries.length === 0) throw new BadRequestException('No fields provided');

        // 2. SQL-String bauen
        // Erzeugt: "name" = $1, "beschreibung" = $2, ...
        const setClause = entries.map(([k], i) => `"${k}" = $${i + 1}`).join(', ');
        
        // 3. Werte-Array extrahieren
        // Erzeugt: ['Hotel Name', 'Schöne Beschreibung', ...]
        const values = entries.map(([, v]) => v);

        // 4. Query ausführen
        // hängen die hotelId als letzten Parameter ($n) an
        const rows = await this.dataSource.query(
        `UPDATE hotel SET ${setClause} WHERE hotel_id = $${values.length + 1} RETURNING *`,
        [...values, hotelId], // [wert1, wert2, ..., hotelId]
        );

        if (rows.length === 0) throw new NotFoundException('Hotel not found');
        return rows[0];
    }

  async remove(hotelId: number) {
    await this.dataSource.query(`DELETE FROM hotel_bild WHERE hotel_id = $1`, [hotelId]);
    await this.dataSource.query(`DELETE FROM hotel_ausstattung WHERE hotel_id = $1`, [hotelId]);

    const rows = await this.dataSource.query(
      `DELETE FROM hotel WHERE hotel_id = $1 RETURNING *`,
      [hotelId],
    );
    if (rows.length === 0) throw new NotFoundException('Hotel not found');
    return rows[0];
  }

  // -------- Hotel Images --------

  async listImages(hotelId: number) {
    await this.findOne(hotelId);

    return this.dataSource.query(
      `SELECT * FROM hotel_bild WHERE hotel_id = $1 ORDER BY hotel_bild_id`,
      [hotelId],
    );
  }

  async addImage(hotelId: number, dto: CreateHotelImageDto) {
    await this.findOne(hotelId);

    const rows = await this.dataSource.query(
      `
      INSERT INTO hotel_bild (hotel_id, pfad, alt_text)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [hotelId, dto.pfad, dto.alt_text],
    );
    return rows[0];
  }

  async updateImage(hotelId: number, imageId: number, dto: UpdateHotelImageDto) {
    // 1. Filtern: Nur Felder nehmen, die nicht 'undefined' sind
    const entries = Object.entries(dto).filter(([, v]) => v !== undefined);
    if (entries.length === 0) throw new BadRequestException('No fields provided');

    // 2. SQL-String bauen
    // Erzeugt: "name" = $1, "beschreibung" = $2, ...
    const setClause = entries.map(([k], i) => `"${k}" = $${i + 1}`).join(', ');

    // 3. Werte-Array extrahieren
    // Erzeugt: ['Hotel Name', 'Schöne Beschreibung', ...]
    const values = entries.map(([, v]) => v);

    // 4. Query ausführen
    // Hängen die hotelId als letzten Parameter ($n) an
    const rows = await this.dataSource.query(
      `
      UPDATE hotel_bild
      SET ${setClause}
      WHERE hotel_bild_id = $${values.length + 1} AND hotel_id = $${values.length + 2}
      RETURNING *
      `,
      [...values, imageId, hotelId],
    );
    if (rows.length === 0) throw new NotFoundException('Image not found for this hotel');
    return rows[0];
  }

  async deleteImage(hotelId: number, imageId: number) {
    const rows = await this.dataSource.query(
      `
      DELETE FROM hotel_bild
      WHERE hotel_bild_id = $1 AND hotel_id = $2
      RETURNING *
      `,
      [imageId, hotelId],
    );
    if (rows.length === 0) throw new NotFoundException('Image not found for this hotel');
    return rows[0];
  }
}