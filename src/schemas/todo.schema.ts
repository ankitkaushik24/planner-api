import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
