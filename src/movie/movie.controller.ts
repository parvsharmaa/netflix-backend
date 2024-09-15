import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDocument } from './movie.schema';
import { JwtGuard } from 'src/auth/guards/jwt-guard';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Post()
  createMovie(
    @Body('Poster') Poster: string,
    @Body('Title') Title: string,
    @Body('Type') Type: string,
    @Body('Year') Year: string,
    @Body('imdbID') imdbID: string,
  ): Promise<MovieDocument> {
    return this.movieService.create(Poster, Title, Type, Year, imdbID);
  }

  @Get()
  findAllMovies(): Promise<MovieDocument[]> {
    return this.movieService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findMovie(@Param('id') id: string): Promise<MovieDocument> {
    return this.movieService.find(id);
  }
}
