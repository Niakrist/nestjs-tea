import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Post()
  async create(@Body() dto: MovieDto) {
    return await this.movieService.create(dto);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return this.movieService.findOneById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
