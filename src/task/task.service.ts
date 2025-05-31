import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

interface ITask {
  id: number;
  title: string;
  isCompleted: boolean;
  description?: string;
  priority?: number;
}

@Injectable()
export class TaskService {
  private tasks: ITask[] = [
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
    return task;
  }

  create(dto: CreateTaskDto) {
    const newTask = {
      id: this.tasks.length + 1,
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      isCompleted: false,
    };
    this.tasks.push(newTask);
    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    // const updateTasks = this.tasks.map((task) =>
    //   task.id === id
    //     ? { ...task, title: dto.title, isCompleted: dto.isCompleted }
    //     : task,
    // );
    // return updateTasks;
    const { title, isCompleted, description, priority } = dto;

    const task = this.getById(id);
    task.title = title;
    task.isCompleted = isCompleted;
    task.description = description;
    task.priority = priority;
    return task;
  }

  patchTask(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.getById(id);
    Object.assign(task, dto);
    return task;
  }

  delete(id: number) {
    const task = this.getById(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    return task;
  }
}
