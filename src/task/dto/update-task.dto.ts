import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

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

  @IsInt({ message: 'Приоритет должен быть целым числом' })
  @IsPositive({ message: 'Поле priority должно быть положительным' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Теги должны быть массивом' })
  @IsEnum(TaskTag, { message: 'Недопустимое значение' })
  @IsOptional()
  tags: TaskTag[];
}
