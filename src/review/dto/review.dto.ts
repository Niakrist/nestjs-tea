import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class ReviewDto {
  @IsString()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  rating: number;

  @IsUUID('4')
  movieId: string;
}
