import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ausstattung } from './entities/ausstattung.entity';
import { CreateAusstattungDto } from './dto/create-ausstattung.dto';
import { UpdateAusstattungDto } from './dto/update-ausstattung.dto';

@Injectable()
export class AusstattungService {
  constructor(
    @InjectRepository(Ausstattung)
    private readonly repo: Repository<Ausstattung>,
  ) {}

  async create(dto: CreateAusstattungDto): Promise<Ausstattung> {
    const neueAusstattung = this.repo.create(dto);
    return await this.repo.save(neueAusstattung);
  }

  async findAll(): Promise<Ausstattung[]> {
    return await this.repo.find({
      order: { ausstattung_id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Ausstattung> {
    const item = await this.repo.findOneBy({ ausstattung_id: id });
    if (!item) throw new NotFoundException(`Ausstattung #${id} nicht gefunden`);
    return item;
  }

  async update(id: number, dto: UpdateAusstattungDto): Promise<Ausstattung> {
    const result = await this.repo.update(id, dto);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Ausstattung #${id} existiert nicht`);
    }
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ausstattung #${id} konnte nicht gelöscht werden`);
    }
  }
}