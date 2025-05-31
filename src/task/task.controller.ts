import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';

interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  priority?: number;
}

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): ITask[] {
    return this.taskService.getAll();
  }
  @Get(':id')
  findById(@Param('id') id: number): ITask {
    return this.taskService.getById(id);
  }
  @Post('create')
  create(@Body() dto: CreateTaskDto): ITask[] {
    return this.taskService.create(dto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDto): ITask {
    return this.taskService.update(Number(id), dto);
  }
  @Patch(':id')
  patchTask(
    @Param('id') id: string,
    @Body() dto: Partial<UpdateTaskDto>,
  ): ITask {
    return this.taskService.patchTask(Number(id), dto);
  }
  @Delete(':id')
  delete(@Param('id') id: string): ITask {
    return this.taskService.delete(Number(id));
  }
}
