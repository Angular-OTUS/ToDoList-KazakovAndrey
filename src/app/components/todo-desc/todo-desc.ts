import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-todo-desc',
    imports: [
        MatFormField,
        MatInput,
    ],
    templateUrl: './todo-desc.html',
})
export class TodoDesc {
    readonly description = input.required<string | null | undefined>();
}
