import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { ToastService } from "src/app/services/toast-service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-toast-list",
    templateUrl: "./toast-list.html",
})
export class ToastList {

    private readonly toastService = inject(ToastService);

    protected get toastList() {
        return this.toastService.toastList;
    }
}
