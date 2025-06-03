import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  releaseYear: number;

  @IsBoolean()
  isPublic: boolean;
}
