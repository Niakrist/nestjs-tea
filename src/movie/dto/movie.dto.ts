import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Genre } from '../entities/movie.entity';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  releaseYear: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  description: string;

  @IsNumber()
  rating: number;

  @IsString()
  releaseData: string;

  @IsString()
  genre: Genre;

  @IsArray()
  @IsUUID('4', { each: true })
  actorsId: string[];
}
