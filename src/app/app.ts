import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastList } from "src/app/components/toast-list/toast-list";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-root',
    templateUrl: './app.html',
    imports: [
        ToastList,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ],
})
export class App {

}
