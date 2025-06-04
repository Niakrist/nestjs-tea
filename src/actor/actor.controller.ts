import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDto } from './dto/actor.dto';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  create(@Body() dto: ActorDto) {
    return this.actorService.create(dto);
  }
  @Get()
  findAll() {
    return this.actorService.findAll();
  }
}
