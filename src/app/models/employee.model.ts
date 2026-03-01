export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  companyId: number;
  status: 'active' | 'inactive';
}

export interface EmployeeAttendance {
  id: number;
  employeeId: number;
  employeeName: string;
  checkInTime: string;
  checkOutTime: string;
  workingHours: number;
  status: 'present' | 'absent' | 'late' | 'on-leave';
  location: string;
  date: string;
}

export interface EmployeeStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeaveToday: number;
}
