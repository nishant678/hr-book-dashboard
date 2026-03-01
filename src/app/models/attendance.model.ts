export interface AttendanceRecord {
  id: number;
  date: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}

export interface GlobalAttendanceStats {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalOnLeave: number;
  attendancePercentage: number;
}

export interface DailyAttendance {
  date: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}

export interface DepartmentAttendance {
  department: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}
