import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from '../../shared/components/stats-card.component';
import { ChartCardComponent } from '../../shared/components/chart-card.component';
import { DataTableComponent, Column } from '../../shared/components/data-table.component';
import { EmployeeService } from '../../services/employee.service';
import { AttendanceService } from '../../services/attendance.service';
import { LeaveService } from '../../services/leave.service';
import { EmployeeStats, GlobalAttendanceStats, EmployeeAttendance, LeaveRequest } from '../../models';

@Component({
    selector: 'app-company-admin-dashboard',
    standalone: true,
    imports: [CommonModule, StatsCardComponent, ChartCardComponent, DataTableComponent],
    template: `
    <div class="space-y-6">
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Company Admin Dashboard</h1>
        <p class="text-slate-400 mt-2">Manage your organization's attendance and leave.</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <app-stats-card
          label="Total Employees"
          [value]="employeeStats?.totalEmployees || '-'"
          [change]="5.2"
          icon="👨‍💼">
        </app-stats-card>

        <app-stats-card
          label="Present Today"
          [value]="employeeStats?.presentToday || '-'"
          [change]="2.1"
          icon="✅">
        </app-stats-card>

        <app-stats-card
          label="Absent Today"
          [value]="employeeStats?.absentToday || '-'"
          [change]="-1.5"
          icon="❌">
        </app-stats-card>

        <app-stats-card
          label="Late Today"
          [value]="employeeStats?.lateToday || '-'"
          [change]="0.8"
          icon="⏰">
        </app-stats-card>

        <app-stats-card
          label="Pending Leaves"
          [value]="'4'"
          [change]="2.3"
          icon="🏖️">
        </app-stats-card>

        <app-stats-card
          label="Approved This Month"
          [value]="'18'"
          [change]="12.5"
          icon="🎉">
        </app-stats-card>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Daily Attendance Chart -->
        <app-chart-card title="Daily Attendance Status">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Daily Attendance Bar Chart]
          </div>
        </app-chart-card>

        <!-- Monthly Trend Chart -->
        <app-chart-card title="Monthly Attendance Trend">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Attendance Line Chart]
          </div>
        </app-chart-card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Department Attendance Chart -->
        <app-chart-card title="Department-wise Attendance">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Department Horizontal Bar Chart]
          </div>
        </app-chart-card>

        <!-- Leave Type Chart -->
        <app-chart-card title="Leave Type Breakdown">
          <div class="h-64 flex items-center justify-center text-slate-400">
            [Chart placeholder - Leave Type Donut Chart]
          </div>
        </app-chart-card>
      </div>

      <!-- Employee Attendance Table -->
      <div class="bg-slate-700 rounded-lg border border-slate-600 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-white text-lg font-semibold">Employee Attendance (Today)</h3>
          <input type="text" placeholder="Search..." 
                 class="px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500">
        </div>

        <app-data-table
          [columns]="attendanceTableColumns"
          [data]="todayAttendance">
        </app-data-table>
      </div>

      <!-- Leave Requests Table -->
      <div class="bg-slate-700 rounded-lg border border-slate-600 p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-white text-lg font-semibold">Leave Requests</h3>
          <select class="px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white focus:outline-none focus:border-indigo-500">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <app-data-table
          [columns]="leaveTableColumns"
          [data]="leaveRequests">
        </app-data-table>
      </div>
    </div>
  `,
    styles: []
})
export class CompanyAdminDashboardComponent implements OnInit {
    employeeStats: EmployeeStats | null = null;
    attendanceStats: GlobalAttendanceStats | null = null;
    todayAttendance: EmployeeAttendance[] = [];
    leaveRequests: LeaveRequest[] = [];

    attendanceTableColumns: Column[] = [
        { key: 'employeeName', label: 'Name', width: '20%' },
        { key: 'checkInTime', label: 'Check-in', width: '15%' },
        { key: 'checkOutTime', label: 'Check-out', width: '15%' },
        { key: 'workingHours', label: 'Working Hours', width: '15%' },
        { key: 'status', label: 'Status', width: '15%', type: 'status' },
        { key: 'location', label: 'Location', width: '20%' }
    ];

    leaveTableColumns: Column[] = [
        { key: 'employeeName', label: 'Employee', width: '20%' },
        { key: 'leaveType', label: 'Leave Type', width: '15%' },
        { key: 'fromDate', label: 'From', width: '15%' },
        { key: 'toDate', label: 'To', width: '15%' },
        { key: 'reason', label: 'Reason', width: '20%' },
        { key: 'status', label: 'Status', width: '15%', type: 'status' }
    ];

    constructor(
        private employeeService: EmployeeService,
        private attendanceService: AttendanceService,
        private leaveService: LeaveService
    ) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.employeeService.getEmployeeStats().subscribe((data: EmployeeStats) => {
            this.employeeStats = data;
        });

        this.attendanceService.getGlobalStats().subscribe((data: GlobalAttendanceStats) => {
            this.attendanceStats = data;
        });

        this.employeeService.getTodayAttendance().subscribe((data: EmployeeAttendance[]) => {
            this.todayAttendance = data;
        });

        this.leaveService.getLeaveRequests().subscribe((data: LeaveRequest[]) => {
            this.leaveRequests = data;
        });
    }
}
