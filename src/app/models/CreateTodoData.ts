import { Todo } from './Todo';

export type CreateTodoData = Pick<Todo, "title" | "description">;
