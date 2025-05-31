import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsNotEmpty({ message: 'Название задачи не может быть пустым' })
  @Length(2, 40, {
    message: 'Название задачи должно быть от 2 до 40 символов ',
  })
  title: string;

  @IsBoolean({ message: 'статус должен быть булевым выражением' })
  isCompleted: boolean;

  @IsString({ message: 'Название задачи должно быть строкой' })
  @IsOptional()
  description: string;

  @IsNumber({}, { message: 'Приоритет должен быть числом' })
  @IsOptional()
  priority: number;
}
