import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
  private readonly todos = [];

  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findOne(todoFilterQuery: FilterQuery<Todo>): Promise<Todo> {
    return this.todoModel.findOne(todoFilterQuery);
  }

  async find(todosFilterQuery: FilterQuery<Todo>): Promise<Todo[]> {
    return this.todoModel.find(todosFilterQuery);
  }

  async create(todo: Todo): Promise<Todo> {
    const newUser = new this.todoModel(todo);
    return newUser.save();
  }

  async findOneAndUpdate(
    todoFilterQuery: FilterQuery<Todo>,
    todo: Partial<Todo>,
  ): Promise<Todo> {
    return this.todoModel.findOneAndUpdate(todoFilterQuery, todo, {
      new: true,
    });
  }

  async createTodo(createCatDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createCatDto);
    return createdTodo.save();
  }

  async deleteTodo(_id: string) {
    const res = await this.todoModel.deleteOne({ _id });

    if (res.deletedCount === 0) {
      throw new HttpException('Item does not exist!', HttpStatus.NOT_FOUND);
    }

    return res;
  }

  deleteAll() {
    return this.todoModel.deleteMany();
  }
}
