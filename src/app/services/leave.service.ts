import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LeaveRequest, LeaveStats, LeaveDistribution } from '../models';

@Injectable({
    providedIn: 'root'
})
export class LeaveService {
    private leaveRequests: LeaveRequest[] = [
        {
            id: 1,
            employeeId: 1,
            employeeName: 'Alice Chen',
            leaveType: 'casual',
            fromDate: '2026-03-10',
            toDate: '2026-03-12',
            reason: 'Personal errands',
            status: 'pending',
            appliedDate: '2026-02-28'
        },
        {
            id: 2,
            employeeId: 3,
            employeeName: 'Carol Anderson',
            leaveType: 'sick',
            fromDate: '2026-03-02',
            toDate: '2026-03-02',
            reason: 'Medical appointment',
            status: 'approved',
            appliedDate: '2026-03-01',
            approvedBy: 'John Smith',
            approvedDate: '2026-03-01'
        },
        {
            id: 3,
            employeeId: 5,
            employeeName: 'Emma Wilson',
            leaveType: 'casual',
            fromDate: '2026-03-02',
            toDate: '2026-03-06',
            reason: 'Vacation',
            status: 'approved',
            appliedDate: '2026-02-25',
            approvedBy: 'John Smith',
            approvedDate: '2026-02-26'
        },
        {
            id: 4,
            employeeId: 2,
            employeeName: 'Bob Martinez',
            leaveType: 'personal',
            fromDate: '2026-03-15',
            toDate: '2026-03-20',
            reason: 'Family matter',
            status: 'pending',
            appliedDate: '2026-02-28'
        },
        {
            id: 5,
            employeeId: 4,
            employeeName: 'David Lee',
            leaveType: 'casual',
            fromDate: '2026-02-15',
            toDate: '2026-02-17',
            reason: 'Weekend extension',
            status: 'rejected',
            appliedDate: '2026-02-10'
        }
    ];

    constructor() { }

    getLeaveRequests(companyId?: number): Observable<LeaveRequest[]> {
        return of(this.leaveRequests);
    }

    getLeaveStats(): Observable<LeaveStats> {
        const distribution: LeaveDistribution[] = [
            {
                leaveType: 'casual',
                count: this.leaveRequests.filter(l => l.leaveType === 'casual').length,
                percentage: 0
            },
            {
                leaveType: 'sick',
                count: this.leaveRequests.filter(l => l.leaveType === 'sick').length,
                percentage: 0
            },
            {
                leaveType: 'personal',
                count: this.leaveRequests.filter(l => l.leaveType === 'personal').length,
                percentage: 0
            },
            {
                leaveType: 'maternity',
                count: this.leaveRequests.filter(l => l.leaveType === 'maternity').length,
                percentage: 0
            },
            {
                leaveType: 'unpaid',
                count: this.leaveRequests.filter(l => l.leaveType === 'unpaid').length,
                percentage: 0
            }
        ];

        const total = distribution.reduce((sum, d) => sum + d.count, 0);
        distribution.forEach(d => {
            d.percentage = total > 0 ? Math.round((d.count / total) * 100) : 0;
        });

        const stats: LeaveStats = {
            totalPendingLeaves: this.leaveRequests.filter(l => l.status === 'pending').length,
            totalApprovedLeaves: this.leaveRequests.filter(l => l.status === 'approved').length,
            totalRejectedLeaves: this.leaveRequests.filter(l => l.status === 'rejected').length,
            leaveDistribution: distribution
        };
        return of(stats);
    }

    approveLeave(id: number): Observable<void> {
        const leave = this.leaveRequests.find(l => l.id === id);
        if (leave) {
            leave.status = 'approved';
            leave.approvedBy = 'Admin';
            leave.approvedDate = new Date().toISOString().split('T')[0];
        }
        return of(void 0);
    }

    rejectLeave(id: number): Observable<void> {
        const leave = this.leaveRequests.find(l => l.id === id);
        if (leave) {
            leave.status = 'rejected';
        }
        return of(void 0);
    }
}
