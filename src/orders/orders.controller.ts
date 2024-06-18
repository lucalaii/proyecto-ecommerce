import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/auth/guards/user.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(AuthGuard, UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crea una nueva orden' })
  @ApiResponse({ status: 201, description: 'Orden creada exitosamente.' })
  @ApiResponse({
    status: 400,
    description: 'El id no tiene un formato válido.',
  })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({
    status: 404,
    description: 'No se encontró el user o el product.',
  })
  createOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    return this.ordersService.createOrder(userId, products);
  }

  @Get(':id')
  @UseGuards(AuthGuard, UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtiene una orden por ID' })
  @ApiResponse({ status: 200, description: 'Orden obtenida exitosamente.' })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({ status: 404, description: 'Orden no encontrada.' })
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
