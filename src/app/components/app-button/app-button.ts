import { Component, ChangeDetectionStrategy, input, output } from "@angular/core";

export type AppButtonColor = "red" | "green";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-button",
    templateUrl: "./app-button.html",
})
export class AppButton {

    readonly color = input.required<AppButtonColor>();
    readonly title = input.required<string>();
    readonly disabled = input<boolean>(false);
    readonly clicked = output();
}
