import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  public price: number;
}

export class CreateItemProduct {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true }) // Para asegurarse de que sean enteros
  @Type(() => Number) // Convierte los valores a número
  ids: number[];
}
