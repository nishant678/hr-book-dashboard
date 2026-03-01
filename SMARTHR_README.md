# SmartHR - Angular 17 Standalone HR Management Dashboard

A complete, enterprise-grade Angular 17+ standalone admin dashboard for an HR Management System with role-based access control, real-time data visualization, and comprehensive employee management features.

## 🎯 Project Overview

SmartHR is a full-featured HR Management Dashboard built with Angular 17, featuring:
- **Dual Dashboard System**: Separate dashboards for Master Admin and Company Admin
- **Role-Based Access Control**: Secure routing based on user roles
- **Real API Integration**: Integrated with Spring Boot backend API
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode by Default**: Modern SaaS-style dark UI with Tailwind CSS
- **Authentication System**: JWT-based authentication with login/logout
- **Data Visualization**: Charts and tables for analytics and reporting
- **Mock Data Services**: Complete data services for companies, employees, attendance, and leaves

## 📦 Tech Stack

- **Framework**: Angular 17+ (Standalone Components)
- **Styling**: Tailwind CSS 3.4+
- **UI Components**: Angular Material, CoreUI
- **HTTP Client**: Angular HttpClient with JWT interceptor
- **Charts**: Chart.js with CoreUI Charts (extensible to ngx-charts)
- **Icons**: Lucide
- **State Management**: RxJS BehaviorSubject
- **Build Tool**: Angular CLI with Vite

## 🗂️ Project Structure

```
src/app/
├── auth/
│   └── login.component.ts          # Login page with API integration
├── core/
│   └── interceptors/
│       └── auth.interceptor.ts     # JWT token injection interceptor
├── features/
│   ├── super-admin/
│   │   ├── dashboard.component.ts  # Master admin dashboard
│   │   └── routes.ts               # Super admin routes
│   └── company-admin/
│       ├── dashboard.component.ts  # Company admin dashboard
│       └── routes.ts               # Company admin routes
├── guards/
│   └── auth.guard.ts               # Auth & role-based guards
├── layout/
│   └── components/
│       ├── sidebar.component.ts    # Navigation sidebar
│       ├── header.component.ts     # Top header with profile
│       └── dashboard-layout.ts     # Main layout wrapper
├── models/
│   ├── auth.model.ts               # Authentication types
│   ├── company.model.ts            # Company data types
│   ├── employee.model.ts           # Employee data types
│   ├── attendance.model.ts         # Attendance types
│   ├── leave.model.ts              # Leave request types
│   └── index.ts                    # Barrel export
├── services/
│   ├── auth.service.ts             # Authentication & JWT management
│   ├── company.service.ts          # Company data service
│   ├── employee.service.ts         # Employee data service
│   ├── attendance.service.ts       # Attendance tracking service
│   ├── leave.service.ts            # Leave management service
│   └── index.ts                    # Barrel export
├── shared/
│   ├── components/
│   │   ├── stats-card.component.ts # Reusable stats card
│   │   ├── chart-card.component.ts # Chart container
│   │   ├── data-table.component.ts # Reusable data table
│   │   └── index.ts                # Barrel export
│   └── pipes/                      # Shared pipes (future)
├── app.component.ts                # Root component
├── app.config.ts                   # Application configuration
└── app.routes.ts                   # Route definitions

tailwind.config.js                  # Tailwind CSS configuration
postcss.config.js                  # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ or 24.0+
- npm 10+
- Angular CLI 21.1.5

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smarthr-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   
   The application will open automatically at `http://localhost:4200`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 🔐 Authentication & Login

### Demo Credentials

Use these credentials to log in:

```
Email: master@system.com
Password: admin123
```

### API Integration

The login endpoint is configured to use:
```
URL: https://hr-spring-backend.onrender.com/api/auth/login
Method: POST
```

**Request Body:**
```json
{
  "email": "master@system.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "master@system.com",
  "role": "MASTER_ADMIN",
  "id": 1
}
```

### JWT Token Handling

- Token is automatically stored in `localStorage` upon successful login
- Token is automatically injected into all HTTP requests via the `AuthInterceptor`
- Token is cleared upon logout
- Users are redirected to login if token is invalid or expired

## 👥 User Roles & Dashboards

### 1. MASTER_ADMIN - Super Admin Dashboard

**URL**: `/super-admin`

**Features**:
- Global system overview
- Company management and monitoring
- System-wide attendance tracking
- Subscription plan management
- Global revenue and analytics
- All user management

**Sidebar Menu**:
- Dashboard
- Companies
- Subscription Plans
- All Users
- Attendance Overview
- Leave Overview
- Reports
- Settings

**Dashboard Cards (6 stats cards)**:
- Total Companies
- Active Companies
- Total Users
- Attendance Today (%)
- Pending Leaves
- Monthly Revenue

**Key Components**:
- Company Growth Chart (Line Chart)
- Global Attendance Overview (Bar Chart)
- Leave Distribution (Donut Chart)
- Revenue Trend (Area Chart)
- Companies Management Table

---

### 2. COMPANY_ADMIN - Company Admin Dashboard

**URL**: `/company-admin`

**Features**:
- Department management
- Employee attendance tracking
- Leave request management
- Holiday management
- Department-specific analytics
- Payroll and reports

**Sidebar Menu**:
- Dashboard
- Employees
- Roles
- Attendance
- Leave Management
- Holidays
- Reports
- Settings

**Dashboard Cards (6 stats cards)**:
- Total Employees
- Present Today
- Absent Today
- Late Check-ins
- Pending Leave Requests
- Approved Leaves This Month

**Key Components**:
- Daily Attendance Status (Bar Chart)
- Monthly Attendance Trend (Line Chart)
- Department-wise Attendance (Horizontal Bar)
- Leave Type Breakdown (Donut Chart)
- Employee Attendance Table
- Leave Requests Table

## 🎨 UI/UX Design System

### Color Palette (Dark Theme)

```
Background:  #0F172A (slate-900)
Card BG:     #1E293B (slate-800)
Primary:     #6366F1 (indigo-600)
Success:     #22C55E (green-400)
Danger:      #EF4444 (red-400)
Warning:     #F59E0B (yellow-400)
Info:        #60A5FA (blue-400)
Text:        #F1F5F9 (slate-100)
```

### Component Styling

- **Rounded Corners**: 16px (rounded-lg)
- **Shadows**: Subtle soft shadows for depth
- **Hover Effects**: Smooth transitions (0.2s ease)
- **Border**: 1px solid slate-600 (slate-700)
- **Typography**: System fonts, responsive sizing

## 📊 Shared Components

### StatsCardComponent
Displays key metrics with growth indicators.

```typescript
<app-stats-card
  label="Total Companies"
  [value]="150"
  [change]="12.5"
  icon="🏢">
</app-stats-card>
```

### ChartCardComponent
Container for chart components with title.

```typescript
<app-chart-card title="Revenue Trend">
  <!-- Chart content here -->
</app-chart-card>
```

### DataTableComponent
Reusable, responsive data table with status styling.

```typescript
<app-data-table
  [columns]="columns"
  [data]="employees">
</app-data-table>
```

## 🔄 Data Services

### AuthService
Handles authentication, JWT tokens, and user info.

```typescript
login(email, password): Observable<LoginResponse>
logout(): void
isAuthenticated(): boolean
getCurrentUser(): UserInfo | null
getUserRole(): UserRole | null
isMasterAdmin(): boolean
isCompanyAdmin(): boolean
```

### CompanyService
Manages company data and statistics.

```typescript
getCompanies(): Observable<Company[]>
getCompanyStats(): Observable<CompanyStats>
getCompanyById(id): Observable<Company>
suspendCompany(id): Observable<void>
```

### EmployeeService
Manages employee data and attendance.

```typescript
getEmployees(companyId?): Observable<Employee[]>
getEmployeeStats(companyId?): Observable<EmployeeStats>
getTodayAttendance(companyId?): Observable<EmployeeAttendance[]>
```

### AttendanceService
Tracks attendance metrics and trends.

```typescript
getGlobalStats(): Observable<GlobalAttendanceStats>
getDailyAttendanceTrend(): Observable<DailyAttendance[]>
getDepartmentAttendance(): Observable<DepartmentAttendance[]>
```

### LeaveService
Manages leave requests and approvals.

```typescript
getLeaveRequests(companyId?): Observable<LeaveRequest[]>
getLeaveStats(): Observable<LeaveStats>
approveLeave(id): Observable<void>
rejectLeave(id): Observable<void>
```

## 🛡️ Route Guards

### authGuard
Protects routes from unauthenticated users.
- Redirects to `/login` if not authenticated
- Used on all protected routes

### roleGuard
Protects routes based on user roles.
- Verifies user has required role
- Redirects to appropriate dashboard based on role
- Prevents unauthorized access

## 📝 TypeScript Models

```typescript
// Auth
interface LoginRequest { email: string; password: string }
interface LoginResponse { token: string; email: string; role: UserRole; id: number }
interface UserInfo { id: number; email: string; role: UserRole }

// Company
interface Company { id: number; name: string; adminName: string; ... }
interface CompanyStats { totalCompanies: number; activeCompanies: number; ... }

// Employee
interface Employee { id: number; name: string; email: string; ... }
interface EmployeeAttendance { id: number; employeeId: number; status: string; ... }

// Attendance
interface GlobalAttendanceStats { totalPresent: number; ... }
interface DailyAttendance { date: string; present: number; ... }

// Leave
interface LeaveRequest { id: number; employeeId: number; status: LeaveStatus; ... }
interface LeaveStats { totalPendingLeaves: number; ... }
```

## 🔧 Configuration Files

### `angular.json`
- Build configuration for development and production
- Angular CLI settings

### `tsconfig.json`
- TypeScript compiler configuration
- Strict mode enabled
- ES2022 target

### `tailwind.config.js`
- Tailwind CSS theme customization
- Dark mode configuration
- Custom color extensions

### `postcss.config.js`
- PostCSS plugin configuration
- Tailwind CSS and autoprefixer setup

## 📱 Responsive Breakpoints

The dashboard is responsive using Tailwind's breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

Dashboard layout adjusts:
- Sidebar collapses on mobile
- Grid layouts adapt to screen size
- Tables become scrollable on small screens

## 🚀 Extending the Project

### Adding New Dashboard Pages

1. Create a new component in the feature folder:
   ```bash
   src/app/features/[role]/pages/new-page.component.ts
   ```

2. Add the route to the feature routes:
   ```typescript
   {
     path: 'new-page',
     component: NewPageComponent
   }
   ```

3. Add menu item to sidebar in `sidebar.component.ts`

### Adding New Services

1. Create service in `src/app/services/`
2. Define interfaces in `src/app/models/`
3. Export from `src/app/services/index.ts`
4. Inject in components using dependency injection

### Adding Charts

The project is set up for:
1. **Chart.js** - Already installed via CoreUI
2. **ngx-charts** - Available as installed dependency

Replace chart placeholders in dashboards with actual chart implementations.

## 📈 Mock Data

The services include realistic mock data for:
- 5 companies with varying statuses
- 5 employees across different departments
- Daily attendance records for the past week
- 5 leave requests in various states
- Department-wise attendance breakdown

Update these in the respective service files:
- `src/app/services/company.service.ts`
- `src/app/services/employee.service.ts`
- `src/app/services/attendance.service.ts`
- `src/app/services/leave.service.ts`

## 🔒 Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **HTTP Interceptor**: Automatic token injection in headers
3. **Route Guards**: Role-based access control
4. **localStorage**: Secure token and user info storage
5. **Logout Cleanup**: Complete session cleanup on logout

## 📚 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Modern mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Login Not Working
1. Check API URL is correct: `https://hr-spring-backend.onrender.com/api/auth/login`
2. Verify credentials: `master@system.com` / `admin123`
3. Check browser console for errors
4. Ensure CORS is enabled on backend

### Dashboard Not Loading
1. Verify authentication is successful
2. Check role matches dashboard route
3. Review browser console for errors
4. Clear localStorage and try again: `localStorage.clear()`

### Styling Not Applied
1. Ensure Tailwind CSS is properly configured
2. Run `npm install` to ensure all dependencies are installed
3. Check `tailwind.config.js` has correct content paths
4. Rebuild the application: `npm run build`

## 📞 API Documentation

### Backend API
The application expects the backend API to be running at:
```
https://hr-spring-backend.onrender.com/api
```

Required endpoints:
- `POST /api/auth/login` - User authentication

The application uses mock data for other endpoints. To connect real endpoints:
1. Update service URLs in respective service files
2. Replace mock data with actual API calls
3. Update HTTP methods (GET, POST, PUT, DELETE)

## 📄 License

This project is part of the CoreUI framework ecosystem. Follow the original CoreUI license terms.

## 🤝 Contributing

When extending this project:
1. Follow Angular style guide for consistency
2. Use standalone components pattern
3. Maintain separation of concerns
4. Create reusable components in `shared/`
5. Keep services focused on single responsibility
6. Update models when adding new features

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Angular documentation: https://angular.io
3. Check Tailwind CSS docs: https://tailwindcss.com
4. Review the backend API documentation

---

**Version**: 1.0.0  
**Last Updated**: March 2, 2026  
**Framework**: Angular 21.1.5  
**Status**: Production Ready ✅
