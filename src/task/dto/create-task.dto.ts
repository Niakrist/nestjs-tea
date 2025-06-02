import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  Matches,
} from 'class-validator';
import { StartsWith } from '../decorators/starts-with.decorators';

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @StartsWith('Task')
  @Length(2, 40)
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt({ message: 'Приоритет должен быть целым числом' })
  @IsPositive({ message: 'Поле priority должно быть положительным' })
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Теги должны быть массивом' })
  @IsEnum(TaskTag, { message: 'Недопустимое значение', each: true })
  @IsOptional()
  tags: TaskTag[];
}
