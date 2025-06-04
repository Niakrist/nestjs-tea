import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { ActorModule } from 'src/actor/actor.module';
import { ActorEntity } from 'src/actor/entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), ActorModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
