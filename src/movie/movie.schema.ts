import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  Poster: string;
  @Prop({ required: true })
  Title: string;
  @Prop({ required: true })
  Type: string;
  @Prop({ required: true })
  Year: string;
  @Prop({ required: true })
  imdbID: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
