import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { MovieEntity } from './entities/movie.entity';
import { MoviePposterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(MoviePposterEntity)
    private readonly moviePosterEntity: Repository<MoviePposterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        releaseYear: 'DESC',
      },
      take: 10,
    });
  }

  async create(dto: MovieDto): Promise<MovieEntity> {
    const {
      title,
      releaseYear,
      isAvailable,
      description,
      genre,
      rating,
      releaseData,
      actorsId,
      imageUrl,
    } = await dto;

    const actors = await this.actorRepository.find({
      where: { id: In(actorsId) },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException('Один или несколько актеров не найдены');
    }

    let poster: MoviePposterEntity | null = null;
    if (imageUrl) {
      poster = await this.moviePosterEntity.create({ url: imageUrl });
      await this.moviePosterEntity.save(poster);
    }

    const movie = await this.movieRepository.create({
      title,
      releaseYear,
      isAvailable,
      description,
      genre,
      rating,
      releaseData,
      actors,
      poster,
    });
    return await this.movieRepository.save(movie);
  }

  async findOneById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors'],
    });
    if (!movie) {
      throw new NotFoundException(`Фильма с id ${id} не найдно`);
    }
    return movie;
  }

  async update(id: string, dto: MovieDto): Promise<MovieEntity> {
    const { title, releaseYear, isAvailable } = await dto;
    const movie = await this.findOneById(id);
    // movie.title = await title;
    // movie.releaseYear = await releaseYear;
    // movie.isPublic = await isPublic;
    Object.assign(movie, dto);
    return await this.movieRepository.save(movie);
  }

  async delete(id: string): Promise<MovieEntity> {
    const movie = await this.findOneById(id);
    await this.movieRepository.remove(movie);
    return movie;
  }
}
