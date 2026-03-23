import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatFormField, MatInput } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppButton } from 'src/app/components/app-button/app-button';
import { AppHint } from 'src/app/directives/app-hint';
import { CreateTodoData } from 'src/app/models/CreateTodoData';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-create-todo',
    templateUrl: './create-todo.html',
    imports: [
        MatFormField,
        MatInput,
        ReactiveFormsModule,
        AppButton,
        AppHint
    ]
})
export class CreateTodo {

    protected readonly form: FormGroup;

    readonly addTodo = output<CreateTodoData>();

    constructor() {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            description: new FormControl(null),
        })
    }

    protected onSubmit() {
        if (this.form.invalid) {
            return;
        }

        const todo: CreateTodoData = {
            title: this.form.get('title')?.value ?? null,
            description: this.form.get('description')?.value ?? null,
        }

        this.addTodo.emit(todo);
        this.form.reset();
    }
}
