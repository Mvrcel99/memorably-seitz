import { Body, Controller, Post, Patch, Delete, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FeaturesService } from '../services/features.service'; 
import { AuthGuard } from '../../_common/auth/auth.guard';
import { CurrentUser } from '../../_common/guard/user.decorator';
import { Ausstattung } from '../entities/feature.entity'; 

@Controller({
    path: 'admin/ausstattung',
    version: '1'
})
@UseGuards(AuthGuard) 
export class AdminAusstattungController {
    
    constructor(private readonly featuresService: FeaturesService) {}

    @Post()
    async create(@Body() data: any) { 
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
        return this.featuresService.delete(id); 
    }
}