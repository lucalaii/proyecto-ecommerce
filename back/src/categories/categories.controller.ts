import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('seeder')
  @ApiOperation({ summary: 'Crea categorías de prueba' })
  @ApiResponse({
    status: 200,
    description: 'Categorías de prueba creadas exitosamente.',
  })
  createCategories() {
    return this.categoriesService.createCategories();
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Categorías obtenidas exitosamente.',
  })
  getCategories() {
    return this.categoriesService.getCategories();
  }
}
