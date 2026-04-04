import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { environment } from 'src/app/config/environment';
import { Toast } from 'src/app/models/Toast';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    private readonly _toastList$ = new BehaviorSubject<Toast[]>([]);

    readonly toastList$ = this._toastList$.asObservable();

    showToast(text: string) {
        const toastId = this.addToast(text);
        this.removeToast(toastId);
    }

    private addToast(text: string): number {
        const current = this._toastList$.getValue();
        const maxId = Math.max(0, ...current.map(t => t.id));
        const toast = {
            id: maxId + 1,
            text: text
        };

        this._toastList$.next([...current, toast]);

        return toast.id;
    }

    private removeToast(id: number) {
        timer(environment.toastTTL).subscribe(() => {
            const current = this._toastList$.getValue();
            this._toastList$.next(current.filter(t => t.id != id));
        });
    }
}
