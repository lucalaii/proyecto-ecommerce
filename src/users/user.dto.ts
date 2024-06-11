import { PickType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
  IsEmail,
  IsStrongPassword,
  Validate,
  IsEmpty,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MaxLength(15)
  password: string;

  @IsNotEmpty()
  @Validate(MatchPassword)
  confirmPassword: string;

  @MinLength(3)
  @MaxLength(80)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @IsEmpty()
  isAdmin: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
