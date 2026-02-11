import { Directive, input, Renderer2, inject, OnDestroy, DOCUMENT, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHint]',
  host: {
    '(mouseover)': 'onMouseOver($event)',
    '(mouseout)': 'onMouseOut()',
  }
})
export class AppHint implements OnDestroy {

    readonly text = input.required<string>({ alias: 'appHint' });

    private tooltip: HTMLElement | null = null;

    private readonly renderer = inject(Renderer2);
    private readonly el = inject(ElementRef);
    private readonly doc = inject(DOCUMENT);

    ngOnDestroy() {
        this.destroyTooltip();
    }

    onMouseOver(event: MouseEvent) {
        event.stopPropagation();

        this.createTooltip();
        this.positionTooltip();
    }

    onMouseOut() {
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

    private positionTooltip() {
        if (!this.tooltip) return;

        const rect = this.el.nativeElement.getBoundingClientRect();
        const gap = 6;
        const tooltipRect = this.tooltip.getBoundingClientRect();

        const left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        const top = rect.top - tooltipRect.height - gap;

        this.renderer.setStyle(this.tooltip, 'left', `${left}px`);
        this.renderer.setStyle(this.tooltip, 'top', `${top}px`);
    }

    private destroyTooltip() {
        if (this.tooltip) {
            this.renderer.removeChild(this.doc.body, this.tooltip);
            this.tooltip = null;
        }
    }
}
