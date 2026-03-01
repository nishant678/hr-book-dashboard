import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Column {
    key: string;
    label: string;
    width?: string;
    type?: 'text' | 'status' | 'action';
}

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="bg-slate-700 rounded-lg border border-slate-600 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-600">
              <th *ngFor="let col of columns" 
                  [style.width]="col.width"
                  class="px-6 py-4 text-left text-sm font-semibold text-slate-300 bg-slate-800">
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of data" class="border-b border-slate-600 hover:bg-slate-600/50 transition-colors">
              <td *ngFor="let col of columns" class="px-6 py-4 text-sm text-slate-300">
                <ng-container [ngSwitch]="col.type">
                  <span *ngSwitchCase="'status'" 
                        [ngClass]="{
                          'px-3 py-1 rounded text-white text-xs font-semibold': true,
                          'bg-green-500/20 text-green-400': row[col.key] === 'active' || row[col.key] === 'present' || row[col.key] === 'approved',
                          'bg-red-500/20 text-red-400': row[col.key] === 'inactive' || row[col.key] === 'absent' || row[col.key] === 'rejected',
                          'bg-yellow-500/20 text-yellow-400': row[col.key] === 'late' || row[col.key] === 'suspended' || row[col.key] === 'pending',
                          'bg-blue-500/20 text-blue-400': row[col.key] === 'on-leave'
                        }">
                    {{ row[col.key] }}
                  </span>
                  <span *ngSwitchDefault>{{ row[col.key] }}</span>
                </ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="data.length === 0" class="px-6 py-8 text-center text-slate-400">
        No data available
      </div>
    </div>
  `,
    styles: []
})
export class DataTableComponent {
    @Input() columns: Column[] = [];
    @Input() data: any[] = [];
}
