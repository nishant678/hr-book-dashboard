import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AttendanceRecord, GlobalAttendanceStats, DailyAttendance, DepartmentAttendance } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AttendanceService {
    private dailyStats: DailyAttendance[] = [
        { date: '2026-02-24', present: 450, absent: 45, late: 35, onLeave: 20 },
        { date: '2026-02-25', present: 480, absent: 30, late: 25, onLeave: 10 },
        { date: '2026-02-26', present: 470, absent: 40, late: 30, onLeave: 15 },
        { date: '2026-02-27', present: 490, absent: 20, late: 20, onLeave: 25 },
        { date: '2026-02-28', present: 485, absent: 35, late: 28, onLeave: 17 },
        { date: '2026-03-01', present: 495, absent: 15, late: 18, onLeave: 22 },
        { date: '2026-03-02', present: 492, absent: 28, late: 32, onLeave: 18 }
    ];

    private departmentAttendance: DepartmentAttendance[] = [
        { department: 'Engineering', present: 145, absent: 8, late: 12, onLeave: 5 },
        { department: 'Sales', present: 98, absent: 12, late: 8, onLeave: 2 },
        { department: 'Marketing', present: 72, absent: 5, late: 3, onLeave: 0 },
        { department: 'HR', present: 42, absent: 2, late: 1, onLeave: 0 },
        { department: 'Finance', present: 85, absent: 3, late: 5, onLeave: 2 },
        { department: 'Operations', present: 50, absent: 1, late: 3, onLeave: 1 }
    ];

    constructor() { }

    getGlobalStats(): Observable<GlobalAttendanceStats> {
        const lastDay = this.dailyStats[this.dailyStats.length - 1];
        const total = lastDay.present + lastDay.absent + lastDay.late + lastDay.onLeave;
        const stats: GlobalAttendanceStats = {
            totalPresent: lastDay.present,
            totalAbsent: lastDay.absent,
            totalLate: lastDay.late,
            totalOnLeave: lastDay.onLeave,
            attendancePercentage: Math.round((lastDay.present / total) * 100)
        };
        return of(stats);
    }

    getDailyAttendanceTrend(): Observable<DailyAttendance[]> {
        return of(this.dailyStats);
    }

    getDepartmentAttendance(): Observable<DepartmentAttendance[]> {
        return of(this.departmentAttendance);
    }
}
