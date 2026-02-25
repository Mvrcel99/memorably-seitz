import { Body, Controller, Post, Patch, Delete, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FeaturesService } from '../services/features.service'; // Name angepasst
import { AuthGuard } from '../../_common/auth/auth.guard';
import { CurrentUser } from '../../_common/guard/user.decorator';
import { Ausstattung } from '../entities/feature.entity'; // Großbuchstabe!

@Controller({
    path: 'admin/ausstattung',
    version: '1'
})
@UseGuards(AuthGuard) 
export class AdminAusstattungController {
    // Hier auch FeaturesService nutzen
    constructor(private readonly featuresService: FeaturesService) {}

    @Post()
    async create(@Body() data: any) { // Nutzt dein CreateFeatureDto
        return this.featuresService.create(data);
    }

    @Get()
    async findAll() {
        return this.featuresService.findAll();
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: any
    ) {
        return this.featuresService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.featuresService.delete(id); // Methode im Service heißt 'delete'
    }
}