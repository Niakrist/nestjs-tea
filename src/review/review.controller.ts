import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Post()
  create(@Body() dto: ReviewDto) {
    return this.reviewService.create(dto);
  }
}
