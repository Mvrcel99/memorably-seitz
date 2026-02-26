import { InjectRepository } from '@nestjs/typeorm';
import { Ausstattung } from '../entities/feature.entity';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateFeatureDto } from '../dto/create-feature.dto';
import { UpdateFeatureDto } from '../dto/update-feature.dto';

@Injectable()
export class FeaturesService {

    constructor(
        @InjectRepository(Ausstattung) 
        private readonly featureRepo: Repository<Ausstattung>
    ) {}

    async findAll(): Promise<Ausstattung[]> {
        return this.featureRepo.find();
    }

    async create(dto: CreateFeatureDto): Promise<Ausstattung> {
    
        const newFeature = this.featureRepo.create({
            titel: dto.titel,
            beschreibung: 'Keine Beschreibung verfügbar' 
        });
        return await this.featureRepo.save(newFeature);
    }

    async update(id: number, dto: UpdateFeatureDto): Promise<any> {
      
        const feature = await this.featureRepo.findOne({ where: { ausstattung_id: id } });
        
        if (!feature) {
            throw new NotFoundException(`Ausstattung mit ID ${id} nicht gefunden`);
        }

        
        if (dto.titel) {
            feature.titel = dto.titel;
        }

        try {
            const updatedFeature = await this.featureRepo.save(feature);
            return {
                message: 'Ausstattung erfolgreich aktualisiert',
                id: updatedFeature.ausstattung_id,
                newTitle: updatedFeature.titel
            };
        } catch (error) {
            if (error.code === '23505' || error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
                throw new ConflictException('Diese Ausstattung existiert bereits!');
            }
            throw error;
        }
    }
    
    async delete(id: number): Promise<any> {
        try {
          
            const result = await this.featureRepo.delete(id);

            if (result.affected === 0) {
                throw new NotFoundException(`Ausstattung mit ID ${id} existiert nicht.`);
            }

            return {
                success: true,
                message: `Ausstattung mit ID ${id} wurde erfolgreich gelöscht`,
            };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            if (error.code === '23503' || error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
                throw new ConflictException('Löschen nicht möglich: Diese Ausstattung wird noch verwendet.');
            }
            throw new InternalServerErrorException('Ein unerwarteter Serverfehler ist aufgetreten');
        }
    }
}