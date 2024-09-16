import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://parv:INmeKLuhXF9O4SUQ@atlas-cluster.cyqc4.mongodb.net/netflix?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
