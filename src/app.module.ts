import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigModule } from './config/config.module';
import { NeedsModule } from './needs/needs.module';
import { NeedsService } from './needs/needs.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/books', {
      useNewUrlParser: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: {
        settings: {
          'editor.cursorShape': 'block',
          'request.credentials': 'include',
        },
      },
      context: ({ req, res }) => {
        // console.log(req.session);
        return { req, res };
      },
    }),
    BooksModule,
    UsersModule,
    ConfigModule,
    NeedsModule,
  ],
  controllers: [AppController],
  providers: [AppService, NeedsService],
})
export class AppModule {}
