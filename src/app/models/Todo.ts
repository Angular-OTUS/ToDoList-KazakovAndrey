import { TodoStatus } from 'src/app/models/TodoStatus';

export interface Todo {
    readonly id: string;
    readonly title: string;
    readonly description: string | null;
    readonly status: TodoStatus;
}
