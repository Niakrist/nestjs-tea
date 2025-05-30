import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.getAll();
  }
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.taskService.getById(id);
  }
  @Post('create')
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }
}
