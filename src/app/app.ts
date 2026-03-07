import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastList } from "src/app/components/toast-list/toast-list";
import { TodoList } from 'src/app/components/todo-list/todo-list';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [
        TodoList,
        ToastList,
    ],
})
export class App {

}
