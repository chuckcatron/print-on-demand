import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';

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
  @IsString()
  isIgnored: boolean;
}
