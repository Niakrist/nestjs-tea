import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
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
    } = await dto;
    const movie = await this.movieRepository.create({
      title,
      releaseYear,
      isAvailable,
      description,
      genre,
      rating,
      releaseData,
    });
    return await this.movieRepository.save(movie);
  }

  async findOneById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ where: { id } });
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
