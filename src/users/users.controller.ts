import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserGuard } from 'src/auth/guards/user.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos exitosamente.' })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 2,
  ) {
    return this.usersService.getAllUsers(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard, UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtiene un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario obtenido exitosamente.' })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualiza un usuario por ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente.',
  })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newUser: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, newUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Elimina un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado exitosamente.' })
  @ApiResponse({ status: 401, description: 'Acceso no autorizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
