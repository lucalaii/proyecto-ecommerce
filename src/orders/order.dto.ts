import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  ValidationArguments,
} from 'class-validator';

export class ProductDto {
  @IsUUID(undefined, {
    message: (args: ValidationArguments) =>
      `el ID ${args.value} debe ser un UUID válido`,
  })
  id: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}
