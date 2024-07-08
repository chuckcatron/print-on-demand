import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly name: string;
  @IsOptional()
  readonly description: string;
  @IsNotEmpty()
  readonly price: number;
  @IsOptional()
  readonly imageUrl: string;
}
