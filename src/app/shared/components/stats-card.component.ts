import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stats-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-indigo-500 transition-all">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-slate-400 text-sm font-medium">{{ label }}</h3>
        <div class="p-2 bg-indigo-500/10 rounded-lg">
          <span class="text-indigo-400 text-xl">{{ icon }}</span>
        </div>
      </div>
      <div class="flex items-end justify-between">
        <div>
          <p class="text-3xl font-bold text-white">{{ value }}</p>
          <p class="text-xs mt-2" [ngClass]="isPositive ? 'text-green-400' : 'text-red-400'">
            <span>{{ isPositive ? '↑' : '↓' }} {{ Math.abs(change) }}%</span>
          </p>
        </div>
      </div>
    </div>
  `,
    styles: []
})
export class StatsCardComponent {
    @Input() label!: string;
    @Input() value!: string | number;
    @Input() change: number = 0;
    @Input() icon: string = '📊';

    Math = Math;

    get isPositive(): boolean {
        return this.change >= 0;
    }
}
