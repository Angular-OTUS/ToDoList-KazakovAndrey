import { Component, ChangeDetectionStrategy, inject, computed } from "@angular/core";
import { ToastService } from "src/app/services/toast-service";
import { Toast } from 'src/app/models/Toast';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-toast-list",
    templateUrl: "./toast-list.html",
})
export class ToastList {

    private readonly toastService = inject(ToastService);

    protected toastList = computed<Toast[]>(() => this.toastService.toastList());
}
