import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastList } from "src/app/components/toast-list/toast-list";
import { RouterOutlet } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [
        ToastList,
        RouterOutlet,
    ],
})
export class App {

}
