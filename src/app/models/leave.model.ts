export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type LeaveType = 'casual' | 'sick' | 'personal' | 'maternity' | 'unpaid';

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: LeaveType;
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
}

export interface LeaveStats {
  totalPendingLeaves: number;
  totalApprovedLeaves: number;
  totalRejectedLeaves: number;
  leaveDistribution: LeaveDistribution[];
}

export interface LeaveDistribution {
  leaveType: LeaveType;
  count: number;
  percentage: number;
}
