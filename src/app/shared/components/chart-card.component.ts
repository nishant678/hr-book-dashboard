import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chart-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-slate-700 rounded-lg p-6 border border-slate-600">
      <h3 class="text-white text-lg font-semibold mb-6">{{ title }}</h3>
      <ng-content></ng-content>
    </div>
  `,
    styles: []
})
export class ChartCardComponent {
    @Input() title!: string;
}
