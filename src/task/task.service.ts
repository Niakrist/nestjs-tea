import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    { id: 1, title: 'Learn NEST JS', isCompleted: false },
    { id: 2, title: 'Build API', isCompleted: false },
    { id: 3, title: 'create db', isCompleted: false },
  ];

  getAll() {
    return this.tasks;
  }

  getById(id: number) {
    const task = this.tasks.find((item) => item.id == id);
    if (!task) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return;
  }

  create(dto: CreateTaskDto) {
    const newTask = {
      id: this.tasks.length + 1,
      title: dto.title,
      isCompleted: false,
    };
    this.tasks.push(newTask);
    return this.tasks;
  }
}
