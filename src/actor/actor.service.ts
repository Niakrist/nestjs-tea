import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActorDto } from './dto/actor.dto';
import { ActorEntity } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async create(dto: ActorDto): Promise<ActorEntity> {
    const { name } = dto;
    const actor = await this.actorRepository.create({ name });
    return await this.actorRepository.save(actor);
  }
}
