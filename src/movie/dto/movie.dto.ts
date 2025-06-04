import {
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

  @IsUUID('4')
  actor_id: string;
}
