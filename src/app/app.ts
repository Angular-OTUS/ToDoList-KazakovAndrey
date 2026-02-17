import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoList } from 'src/app/components/todo-list/todo-list';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [
        TodoList,
    ],
})
export class App {

}
