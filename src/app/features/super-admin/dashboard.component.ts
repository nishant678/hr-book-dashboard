import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '../../shared/components/stats-card.component';
import { ChartCardComponent } from '../../shared/components/chart-card.component';
import { DataTableComponent, Column } from '../../shared/components/data-table.component';
import { CompanyService } from '../../services/company.service';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';
import { Company, CompanyStats, EmployeeStats, GlobalAttendanceStats } from '../../models';

@Component({
    selector: 'app-super-admin-dashboard',
    standalone: true,
    imports: [CommonModule, StatsCardComponent, ChartCardComponent, DataTableComponent],
    template: `
    <div class="space-y-6">
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Master Admin Dashboard</h1>
        <p class="text-slate-400 mt-2">Welcome back! Here's what's happening in your system.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <app-stats-card
          label="Total Companies"
          [value]="companyStats?.totalCompanies || '-'"
          [change]="12.5"
          icon="🏢">
        </app-stats-card>

        <app-stats-card
          label="Active Companies"
          [value]="companyStats?.activeCompanies || '-'"
          [change]="8.2"
          icon="✅">
        </app-stats-card>

        <app-stats-card
          label="Total Users"
          [value]="companyStats?.totalEmployees || '-'"
          [change]="15.3"
          icon="👥">
        </app-stats-card>

        <app-stats-card
          label="Attendance Today"
          [value]="attendanceStats?.attendancePercentage || '-'"
          [change]="3.1"
          icon="📋">
        </app-stats-card>

        <app-stats-card
          label="Pending Leaves"
          [value]="'24'"
          [change]="-5.2"
          icon="🏖️">
        </app-stats-card>

        <app-stats-card
          label="Monthly Revenue"
          [value]="'$' + (companyStats?.monthlyRevenue?.toLocaleString() || '-')"
          [change]="18.5"
          icon="💰">
        </app-stats-card>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Company Growth Chart -->
        <app-chart-card title="Company Growth (Last 6 Months)">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Company Growth Line Chart]
          </div>
        </app-chart-card>

        <!-- Global Attendance Chart -->
        <app-chart-card title="Global Attendance Overview">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Attendance Bar Chart]
          </div>
        </app-chart-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Leave Distribution Chart -->
        <app-chart-card title="Leave Distribution">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Leave Donut Chart]
          </div>
        </app-chart-card>

        <!-- Revenue Trend Chart -->
        <app-chart-card title="Revenue Trend">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Revenue Area Chart]
          </div>
        </app-chart-card>
      </div>

      <!-- Companies Table -->
      <div class="bg-slate-700 rounded-lg border border-slate-600 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-white text-lg font-semibold">Companies</h3>
          <div class="flex gap-2">
            <input type="text" placeholder="Search..." 
                   class="px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500">
            <button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              Export
            </button>
          </div>
        </div>

        <app-data-table
          [columns]="companyTableColumns"
          [data]="companies">
        </app-data-table>
      </div>
    </div>
  `,
    styles: []
})
export class SuperAdminDashboardComponent implements OnInit {
    companies: Company[] = [];
    companyStats: CompanyStats | null = null;
    employeeStats: EmployeeStats | null = null;
    attendanceStats: GlobalAttendanceStats | null = null;

    companyTableColumns: Column[] = [
        { key: 'name', label: 'Company Name', width: '25%' },
        { key: 'adminName', label: 'Admin', width: '20%' },
        { key: 'employeeCount', label: 'Employees Count', width: '15%' },
        { key: 'plan', label: 'Plan', width: '15%' },
        { key: 'status', label: 'Status', width: '15%', type: 'status' }
    ];

    constructor(
        private companyService: CompanyService,
        private employeeService: EmployeeService,
        private attendanceService: AttendanceService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.companyService.getCompanies().subscribe((data: Company[]) => {
            this.companies = data;
        });

        this.companyService.getCompanyStats().subscribe((data: CompanyStats) => {
            this.companyStats = data;
        });

        this.attendanceService.getGlobalStats().subscribe((data: GlobalAttendanceStats) => {
            this.attendanceStats = data;
        });
    }
}
