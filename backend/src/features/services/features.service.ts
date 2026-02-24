import { InjectRepository } from '@nestjs/typeorm';
// import { Feature } from '../entities/feature.entity';
import { Repository } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFeatureDto } from '../dto/create-feature.dto';
import { UpdateFeatureDto } from '../dto/update-feature.dto';
import { NotFoundException, ConflictException } from '@nestjs/common';
@Injectable()
export class FeaturesService {

//     constructor(
//     @InjectRepository(Feature) private readonly featureRepo: Repository<Feature>
//     ){}

//     async findAll(): Promise<Feature[]> {
//         return this.featureRepo.find();
//     }
//     //create Methode
//     async create(dto: CreateFeatureDto): Promise<Feature> {
//         const newFeature = this.featureRepo.create(dto);
//         return await this.featureRepo.save(newFeature);
//     }

//     //update Methode 
//     async update(id: number, dto: UpdateFeatureDto): Promise<any> {
//   const feature = await this.featureRepo.findOne({ where: { id } });
  
//   if (!feature) {
//     throw new NotFoundException(`Feature mit ID ${id} nicht gefunden`);
//   }

//   feature.label = dto.label;

//   try {
//         const updatedFeature = await this.featureRepo.save(feature);
//         return {
//         message: 'Feature erfolgreich aktualisiert',
//         id: updatedFeature.id,
//         newLabel: updatedFeature.label
//         };
//     } catch (error) {
//         if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
//         throw new ConflictException('Dieses Feature-Label existiert bereits!');
//         }
//         throw error;
//     }
//     }
    
//     //delete Methode
//         async delete(id: number): Promise<any> {
//     try {
  
//         const result = await this.featureRepo.delete(id);

    
//         if (result.affected === 0) {
//         throw new NotFoundException(`Feature mit ID ${id} existiert nicht oder wurde bereits gelöscht.`);
//         }

//     return {
//         success: true,
//         message: `Feature mit ID ${id} wurde erfolgreich gelöscht`,
//         };

//     } catch (error) {
    
//         if (error instanceof NotFoundException) {
//         throw error;
//         }

    
//         if (error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY' || error.code === '23503') {
//         throw new ConflictException('Löschen nicht möglich: Feature wird noch verwendet.');
//         }

    
//         console.error(error); 
//         throw new InternalServerErrorException('Ein unerwarteter Serverfehler ist aufgetreten');
//     }
//     }
}