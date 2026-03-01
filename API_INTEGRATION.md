# SmartHR - API Integration Guide

## Overview

This guide helps you integrate the SmartHR dashboard with a real backend API. Currently, the application uses mock data services. Follow these steps to connect to your backend.

## Backend API Configuration

### Environment Configuration

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api-domain.com/api'  // ← Change this
};
```

Update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/api'  // ← Change this
};
```

Use environment in services:
```typescript
import { environment } from '../../environments/environment';

export class MyService {
  private apiUrl = environment.apiUrl;
}
```

---

## 1. Authentication Service Integration

### Current Implementation
File: `src/app/services/auth.service.ts`

The service already integrates with your backend at:
```
POST https://hr-spring-backend.onrender.com/api/auth/login
```

### Expected API Response

```json
{
  "token": "JWT_TOKEN_HERE",
  "email": "user@example.com",
  "role": "MASTER_ADMIN",
  "id": 1
}
```

### Required Request
```json
{
  "email": "master@system.com",
  "password": "admin123"
}
```

### Token Usage
Tokens are automatically added to all requests via `AuthInterceptor`:

```typescript
Authorization: Bearer <JWT_TOKEN>
```

---

## 2. Company Service Integration

### File Location
`src/app/services/company.service.ts`

### Update the API URL
```typescript
export class CompanyService {
  private readonly API_URL = `${environment.apiUrl}/companies`;  // Update this

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.API_URL);  // Replace mock data
  }

  getCompanyStats(): Observable<CompanyStats> {
    return this.http.get<CompanyStats>(`${this.API_URL}/stats`);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.API_URL}/${id}`);
  }

  suspendCompany(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/suspend`, {});
  }

  activateCompany(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/activate`, {});
  }
}
```

### Required API Endpoints

```
GET    /api/companies              → List all companies
GET    /api/companies/stats        → Get company statistics
GET    /api/companies/:id          → Get single company
PATCH  /api/companies/:id/suspend  → Suspend company
PATCH  /api/companies/:id/activate → Activate company
```

### Company Model
```typescript
interface Company {
  id: number;
  name: string;
  adminName: string;
  employeeCount: number;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  createdDate: string;
  monthlyRevenue: number;
}
```

---

## 3. Employee Service Integration

### File Location
`src/app/services/employee.service.ts`

### Update the Service
```typescript
export class EmployeeService {
  private readonly API_URL = `${environment.apiUrl}/employees`;  // Update this

  constructor(private http: HttpClient) {}

  getEmployees(companyId?: number): Observable<Employee[]> {
    const url = companyId 
      ? `${this.API_URL}?companyId=${companyId}`
      : this.API_URL;
    return this.http.get<Employee[]>(url);
  }

  getEmployeeStats(companyId?: number): Observable<EmployeeStats> {
    const url = companyId 
      ? `${this.API_URL}/stats?companyId=${companyId}`
      : `${this.API_URL}/stats`;
    return this.http.get<EmployeeStats>(url);
  }

  getTodayAttendance(companyId?: number): Observable<EmployeeAttendance[]> {
    const url = companyId 
      ? `${this.API_URL}/attendance/today?companyId=${companyId}`
      : `${this.API_URL}/attendance/today`;
    return this.http.get<EmployeeAttendance[]>(url);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.API_URL}/${id}`);
  }
}
```

### Required API Endpoints

```
GET    /api/employees                          → List employees
GET    /api/employees?companyId=<id>          → List employees by company
GET    /api/employees/stats                    → Employee statistics
GET    /api/employees/stats?companyId=<id>    → Stats for specific company
GET    /api/employees/attendance/today         → Today's attendance
GET    /api/employees/:id                      → Get single employee
```

### Employee Models
```typescript
interface Employee {
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

interface EmployeeAttendance {
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

interface EmployeeStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeaveToday: number;
}
```

---

## 4. Attendance Service Integration

### File Location
`src/app/services/attendance.service.ts`

### Update the Service
```typescript
export class AttendanceService {
  private readonly API_URL = `${environment.apiUrl}/attendance`;

  constructor(private http: HttpClient) {}

  getGlobalStats(): Observable<GlobalAttendanceStats> {
    return this.http.get<GlobalAttendanceStats>(`${this.API_URL}/stats`);
  }

  getDailyAttendanceTrend(): Observable<DailyAttendance[]> {
    return this.http.get<DailyAttendance[]>(`${this.API_URL}/daily-trend`);
  }

  getDepartmentAttendance(): Observable<DepartmentAttendance[]> {
    return this.http.get<DepartmentAttendance[]>(`${this.API_URL}/by-department`);
  }
}
```

### Required API Endpoints

```
GET    /api/attendance/stats              → Global attendance statistics
GET    /api/attendance/daily-trend        → Daily attendance trends
GET    /api/attendance/by-department      → Department-wise attendance
```

### Models
```typescript
interface GlobalAttendanceStats {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalOnLeave: number;
  attendancePercentage: number;
}

interface DailyAttendance {
  date: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}

interface DepartmentAttendance {
  department: string;
  present: number;
  absent: number;
  late: number;
  onLeave: number;
}
```

---

## 5. Leave Service Integration

### File Location
`src/app/services/leave.service.ts`

### Update the Service
```typescript
export class LeaveService {
  private readonly API_URL = `${environment.apiUrl}/leaves`;

  constructor(private http: HttpClient) {}

  getLeaveRequests(companyId?: number): Observable<LeaveRequest[]> {
    const url = companyId 
      ? `${this.API_URL}?companyId=${companyId}`
      : this.API_URL;
    return this.http.get<LeaveRequest[]>(url);
  }

  getLeaveStats(): Observable<LeaveStats> {
    return this.http.get<LeaveStats>(`${this.API_URL}/stats`);
  }

  approveLeave(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/approve`, {});
  }

  rejectLeave(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}/reject`, {});
  }
}
```

### Required API Endpoints

```
GET    /api/leaves                   → List leave requests
GET    /api/leaves?companyId=<id>   → Leaves for company
GET    /api/leaves/stats            → Leave statistics
PATCH  /api/leaves/:id/approve      → Approve leave request
PATCH  /api/leaves/:id/reject       → Reject leave request
```

### Models
```typescript
type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
type LeaveType = 'casual' | 'sick' | 'personal' | 'maternity' | 'unpaid';

interface LeaveRequest {
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

interface LeaveStats {
  totalPendingLeaves: number;
  totalApprovedLeaves: number;
  totalRejectedLeaves: number;
  leaveDistribution: LeaveDistribution[];
}
```

---

## Error Handling

### Add Error Handling to Services

```typescript
import { catchError } from 'rxjs/operators';

getCompanies(): Observable<Company[]> {
  return this.http.get<Company[]>(this.API_URL).pipe(
    catchError(error => {
      console.error('Error fetching companies:', error);
      // Show error message to user
      // Return empty array or throw error
      throw error;
    })
  );
}
```

### Global Error Handling with Interceptor

Create `src/app/core/interceptors/error.interceptor.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.error('HTTP Error:', error);
        // Handle error globally
        return throwError(() => error);
      })
    );
  }
}
```

Add to `app.config.ts`:
```typescript
{
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
```

---

## Testing the Integration

### 1. Test Login
```bash
curl -X POST https://your-api.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"master@system.com","password":"admin123"}'
```

### 2. Test with Token
```bash
curl -X GET https://your-api.com/api/companies \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Browser Console Test
```javascript
// In browser console
fetch('https://your-api.com/api/companies', {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('auth_token')
  }
})
.then(r => r.json())
.then(d => console.log(d))
.catch(e => console.error(e))
```

---

## CORS Configuration

If you get CORS errors:

### Backend Solution (Recommended)
Configure CORS in your Spring Boot backend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:4200", "https://yourdomain.com")
                    .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### Frontend Proxy (Development Only)
Create `proxy.conf.json` in project root:

```json
{
  "/api/*": {
    "target": "https://your-api.com",
    "changeOrigin": true,
    "pathRewrite": { "^/api": "/api" }
  }
}
```

Use in development:
```bash
ng serve --proxy-config proxy.conf.json
```

---

## Deployment Checklist

- [ ] Update API URL for production
- [ ] Remove console.log statements
- [ ] Add error handling
- [ ] Test all API endpoints
- [ ] Configure CORS properly
- [ ] Update environment files
- [ ] Run `npm run build`
- [ ] Deploy to production
- [ ] Monitor API errors
- [ ] Update documentation

---

## Troubleshooting

### 401 Unauthorized
- Token might be expired
- Token might be invalid
- Authorization header not being sent
- Check `AuthInterceptor` is registered

### 403 Forbidden
- User doesn't have permission
- Role doesn't match required role
- Check user role in Auth service

### 404 Not Found
- API endpoint doesn't exist
- URL is incorrect
- Check endpoint naming conventions

### CORS Error in Browser
- Backend CORS not configured
- Use proxy in development
- Check allowed origins

### Network Timeout
- API server is down
- Network connectivity issue
- Request taking too long
- Increase timeout in HttpClient

---

**Last Updated**: March 2, 2026  
**Version**: 1.0.0
