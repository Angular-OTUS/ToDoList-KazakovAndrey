import { Directive, input, Renderer2, Inject, OnDestroy, DOCUMENT } from '@angular/core';

@Directive({
  selector: '[appHint]',
  host: {
    '(mouseenter)': 'onMouseEnter($event)',
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
  }
})
export class AppHint implements OnDestroy {

    readonly text = input.required<string>({ alias: 'appHint' });

    private tooltip: HTMLElement | null = null;

    constructor(
        private readonly renderer: Renderer2,
        @Inject(DOCUMENT) private readonly doc: Document
    ) { }

    ngOnDestroy() {
        this.destroyTooltip();
    }

    onMouseEnter(event: MouseEvent) {
        this.createTooltip();
        this.moveTooltip(event);
    }

    onMouseMove(event: MouseEvent) {
        this.moveTooltip(event);
    }

    onMouseLeave() {
        this.destroyTooltip();
    }

    private createTooltip() {
        if (this.tooltip) {
            return;
        }

        const div = this.renderer.createElement('div');
        this.renderer.setProperty(div, 'innerText', this.text());

        this.renderer.setStyle(div, 'position', 'fixed');
        this.renderer.setStyle(div, 'pointer-events', 'none');
        this.renderer.setStyle(div, 'background', '#FFFF8F');
        this.renderer.setStyle(div, 'color', '#000000');
        this.renderer.setStyle(div, 'padding', '4px 8px');
        this.renderer.setStyle(div, 'border-radius', '4px');
        this.renderer.setStyle(div, 'font-size', '12px');
        this.renderer.setStyle(div, 'z-index', '9999');
        this.renderer.setStyle(div, 'white-space', 'nowrap');

        this.renderer.appendChild(this.doc.body, div);
        this.tooltip = div;
    }

    private moveTooltip(event: MouseEvent) {
        if (this.tooltip) {
            const offset = 12;
            this.renderer.setStyle(this.tooltip, 'left', `${event.clientX + offset}px`);
            this.renderer.setStyle(this.tooltip, 'top', `${event.clientY + offset}px`);
        }
    }

    private destroyTooltip() {
        if (this.tooltip) {
            this.renderer.removeChild(this.doc.body, this.tooltip);
            this.tooltip = null;
        }
    }
}
