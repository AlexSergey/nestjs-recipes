import {
  IsString,
  ValidateNested,
  IsEmail,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDTO } from './address.dto';

enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserType)
  type: UserType;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDTO)
  addresses: AddressDTO[];
}
