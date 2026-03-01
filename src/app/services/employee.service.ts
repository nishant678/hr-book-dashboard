import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee, EmployeeAttendance, EmployeeStats } from '../models';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private employees: Employee[] = [
        {
            id: 1,
            name: 'Alice Chen',
            email: 'alice.chen@company.com',
            phone: '+1 555-0101',
            department: 'Engineering',
            position: 'Senior Developer',
            joinDate: '2022-03-15',
            companyId: 1,
            status: 'active'
        },
        {
            id: 2,
            name: 'Bob Martinez',
            email: 'bob.martinez@company.com',
            phone: '+1 555-0102',
            department: 'Human Resources',
            position: 'HR Manager',
            joinDate: '2021-06-20',
            companyId: 1,
            status: 'active'
        },
        {
            id: 3,
            name: 'Carol Anderson',
            email: 'carol.anderson@company.com',
            phone: '+1 555-0103',
            department: 'Sales',
            position: 'Sales Manager',
            joinDate: '2023-01-10',
            companyId: 1,
            status: 'active'
        },
        {
            id: 4,
            name: 'David Lee',
            email: 'david.lee@company.com',
            phone: '+1 555-0104',
            department: 'Engineering',
            position: 'Frontend Developer',
            joinDate: '2023-05-18',
            companyId: 1,
            status: 'active'
        },
        {
            id: 5,
            name: 'Emma Wilson',
            email: 'emma.wilson@company.com',
            phone: '+1 555-0105',
            department: 'Marketing',
            position: 'Marketing Director',
            joinDate: '2022-08-24',
            companyId: 1,
            status: 'active'
        }
    ];

    private attendanceRecords: EmployeeAttendance[] = [
        {
            id: 1,
            employeeId: 1,
            employeeName: 'Alice Chen',
            checkInTime: '09:00 AM',
            checkOutTime: '06:15 PM',
            workingHours: 9.25,
            status: 'present',
            location: 'Office - Floor 2',
            date: '2026-03-02'
        },
        {
            id: 2,
            employeeId: 2,
            employeeName: 'Bob Martinez',
            checkInTime: '09:30 AM',
            checkOutTime: '06:00 PM',
            workingHours: 8.5,
            status: 'late',
            location: 'Office - Floor 1',
            date: '2026-03-02'
        },
        {
            id: 3,
            employeeId: 3,
            employeeName: 'Carol Anderson',
            checkInTime: '',
            checkOutTime: '',
            workingHours: 0,
            status: 'absent',
            location: '-',
            date: '2026-03-02'
        },
        {
            id: 4,
            employeeId: 4,
            employeeName: 'David Lee',
            checkInTime: '08:45 AM',
            checkOutTime: '05:45 PM',
            workingHours: 9,
            status: 'present',
            location: 'Remote',
            date: '2026-03-02'
        },
        {
            id: 5,
            employeeId: 5,
            employeeName: 'Emma Wilson',
            checkInTime: '',
            checkOutTime: '',
            workingHours: 0,
            status: 'on-leave',
            location: '-',
            date: '2026-03-02'
        }
    ];

    constructor(private http: HttpClient) { }

    getEmployees(companyId?: number): Observable<Employee[]> {
        if (companyId) {
            return of(this.employees.filter(e => e.companyId === companyId));
        }
        return of(this.employees);
    }

    getEmployeeStats(companyId?: number): Observable<EmployeeStats> {
        const employees = companyId
            ? this.employees.filter(e => e.companyId === companyId)
            : this.employees;

        const attendance = companyId
            ? this.attendanceRecords.filter(a => employees.some(e => e.id === a.employeeId))
            : this.attendanceRecords;

        const stats: EmployeeStats = {
            totalEmployees: employees.length,
            presentToday: attendance.filter(a => a.status === 'present').length,
            absentToday: attendance.filter(a => a.status === 'absent').length,
            lateToday: attendance.filter(a => a.status === 'late').length,
            onLeaveToday: attendance.filter(a => a.status === 'on-leave').length
        };
        return of(stats);
    }

    getTodayAttendance(companyId?: number): Observable<EmployeeAttendance[]> {
        if (companyId) {
            const companyEmployees = this.employees.filter(e => e.companyId === companyId).map(e => e.id);
            return of(this.attendanceRecords.filter(a => companyEmployees.includes(a.employeeId)));
        }
        return of(this.attendanceRecords);
    }

    getEmployeeById(id: number): Observable<Employee | undefined> {
        return of(this.employees.find(e => e.id === id));
    }
}
