import { TodoStatus } from 'src/app/models/TodoStatus';

export interface Todo {
    readonly id: number;
    readonly title: string;
    readonly description: string | null;
    readonly status: TodoStatus;
}
