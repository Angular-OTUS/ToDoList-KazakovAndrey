import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToastList } from "src/app/components/toast-list/toast-list";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from 'src/app/config/environment';

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

    protected enUrl: string = environment.i18n.enUrl;
    protected ruUrl: string = environment.i18n.ruUrl;

}
