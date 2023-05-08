import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TodoDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop({ required: true, unique: true, default: uuidv4() })
  id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
