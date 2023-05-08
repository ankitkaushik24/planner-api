import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [AppController, TodoController],
  providers: [TodoService],
})
export class AppModule {}
