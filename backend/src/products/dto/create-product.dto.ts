import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsBoolean,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  externalId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  variants: number;

  @IsNotEmpty()
  @IsNumber()
  synced: number;

  @IsNotEmpty()
  @IsUrl()
  thumbnailUrl: string;

  @IsNotEmpty()
  @IsBoolean()
  isIgnored: boolean;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Transform(({ value }) => Number(parseFloat(value).toFixed(2)))
  price: number;

  @IsOptional()
  @IsString()
  description: string;
}
