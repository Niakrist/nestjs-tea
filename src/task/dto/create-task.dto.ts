import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber({}, { message: 'Приоритет должен быть числом' })
  @IsOptional()
  priority: number;
}
