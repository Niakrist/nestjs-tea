import { Controller, Get, Headers, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { emitWarning } from 'process';
import { MovieService } from './movie.service';

const films = [
  {
    title: 'film 1',
  },
  {
    title: 'film 2',
  },
  {
    title: 'film 3',
  },
];

@Controller('movies')
export class MovieController {
  @Get()
  findAll(@Query() query: any) {
    return JSON.stringify(query);
  }

  @Get('headers')
  getHeders(@Headers() headers: any) {
    return headers;
  }

  @Get('request')
  gerRequestDetail(@Req() req: Request) {
    return {
      method: req.method,
      url: req.url,
      headers: req.headers,
      query: req.query,
      params: req.params,
    };
  }

  @Get('response')
  gerResponseDetail(@Res() res: Response) {
    return res.status(200).json({ message: 'work' });
  }
}
