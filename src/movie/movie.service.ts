import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument } from './movie.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private readonly movieModal: Model<MovieDocument>,
  ) {}

  async create(
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string,
  ): Promise<MovieDocument> {
    const newMovie = new this.movieModal({ Poster, Title, Type, Year, imdbID });
    return newMovie.save();
  }

  async findAll(): Promise<MovieDocument[]> {
    return this.movieModal.find().exec();
  }

  async find(id: string): Promise<MovieDocument> {
    return this.movieModal.findById(id).exec();
  }
}
