import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.createTodo(createTodoDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.todoService.find(query || {});
  }

  @Get(':id')
  findOne(@Param('id') _id: string) {
    return this.todoService.findOne({ _id });
  }

  @Put(':id')
  update(@Param('id') _id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.findOneAndUpdate({ _id }, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.todoService.deleteTodo(_id);
  }

  @Delete()
  removeAll() {
    return this.todoService.deleteAll();
  }
}
