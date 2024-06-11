import {
  Controller,
  Get,
  UseGuards,
  Query,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  Body,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los productos' })
  getAllProducts(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.productsService.getAllProducts(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto obtenido exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProduct(id);
  }

  @Post('seeder')
  @ApiOperation({ summary: 'Crea un producto de prueba' })
  createProduct() {
    return this.productsService.createProduct();
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualiza un producto por ID' })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiBearerAuth()
  updateProduct(@Param('id') id: string, @Body() newProduct: any) {
    return this.productsService.updateProduct(id, newProduct);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
