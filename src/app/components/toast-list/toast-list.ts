import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { ToastService } from 'src/app/services/toast-service';
import { AsyncPipe } from '@angular/common';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-toast-list',
    templateUrl: './toast-list.html',
    imports: [
        AsyncPipe
    ]
})
export class ToastList {

    private readonly toastService = inject(ToastService);

    protected toastList = this.toastService.toastList$;
}
