import { Injectable, signal } from "@angular/core";
import { environment } from "src/app/config/environment";
import { Toast } from "src/app/models/Toast";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private readonly _toastList = signal<Toast[]>([]);

    readonly toastList = this._toastList.asReadonly();

    showToast(text: string) {
        const toastId = this.addToast(text);
        this.removeToast(toastId);
    }

    private addToast(text: string): number {
        const maxId = Math.max(0, ...this._toastList().map(t => t.id));
        const toast = {
            id: maxId + 1,
            text: text
        };

        this._toastList.update(toastList => [...toastList, toast]);

        return toast.id;
    }

    private removeToast(id: number) {
        setTimeout(
            () => this._toastList.update(toastList => toastList.filter(t => t.id != id)),
            environment.toastTTL,
        );
    }
}
