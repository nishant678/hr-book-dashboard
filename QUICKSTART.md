# SmartHR - Quick Start Guide

## 🚀 First Time Setup (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

The app opens at `http://localhost:4200`

### 3. Login with Demo Account
```
Email: master@system.com
Password: admin123
```

### Done! 🎉

---

## 📖 What to Expect

### First Login
- Dashboard redirects based on your role
- **MASTER_ADMIN** → `/super-admin` dashboard
- **COMPANY_ADMIN** → `/company-admin` dashboard

### Super Admin Dashboard (Master Admin)
View system-wide metrics:
- 6 stats cards showing companies, users, attendance
- 4 charts with company growth, attendance, leave distribution, revenue
- Companies management table with search & export

### Company Admin Dashboard
View company-specific metrics:
- 6 stats cards showing employee data and attendance
- 4 charts with daily attendance, trends, departments, leave types
- Employee attendance table for today
- Leave requests table with approval/rejection

---

## 🎯 Common Tasks

### View Your Profile
Click the profile avatar in top-right → Profile

### Logout
Click profile avatar → Logout

### Navigate to Different Sections
Use the left sidebar menu to navigate

### Search & Filter
Use search boxes in table headers

### Export Data
Click 'Export' button in table headers (placeholder)

---

## 🔧 For Developers

### Project Structure
```
src/app/
├── auth/          # Login page
├── core/          # Interceptors, guards
├── features/      # Dashboard components
├── guards/        # Route protection
├── layout/        # Header & sidebar
├── models/        # TypeScript interfaces
├── services/      # API & data services
└── shared/        # Reusable components
```

### Key Files to Modify

**Change Login Credentials:**
- File: `src/app/auth/login.component.ts`
- Lines: 33-34 (placeholder values)

**Change API URL:**
- File: `src/environments/environment.ts`
- Update: `apiUrl` value

**Add New Menu Items:**
- File: `src/app/layout/components/sidebar.component.ts`
- Update: `navItems` array

**Update Dashboard Cards:**
- Edit dashboard components in `src/app/features/[role]/`

---

## 🚨 Troubleshooting

### Page Shows Blank?
- Check browser console (F12) for errors
- Clear localStorage: `localStorage.clear()`
- Refresh page: `Ctrl+Shift+R`

### Login Fails?
- Verify API is accessible
- Check credentials are correct
- Check browser network tab (F12 → Network)

### Styles Look Wrong?
- Run: `npm install`
- Run: `npm start` again
- Check Tailwind is installed

### Need to Change Role?
- Logout and login with different account
- Or modify mock response in login

---

## 📝 Next Steps

1. **Connect Real API**
   - Update service files with actual endpoints
   - Remove mock data

2. **Add More Pages**
   - Create components in `features/[role]`
   - Add to routes in `routes.ts`

3. **Customize UI**
   - Edit colors in `tailwind.config.js`
   - Modify components in `shared/components/`

4. **Add Charts**
   - Import Chart.js components
   - Add to dashboard components

5. **Deploy**
   - Run: `npm run build`
   - Deploy `dist/` folder to hosting

---

## 🎓 Learning Resources

Modern Angular (21+):
- https://angular.io/docs
- Standalone Components: https://angular.io/guide/standalone-components

Tailwind CSS:
- https://tailwindcss.com/docs

TypeScript:
- https://www.typescriptlang.org/docs/

RxJS:
- https://rxjs.dev/

---

## 📞 Support Files

- [SMARTHR_README.md](./SMARTHR_README.md) - Full documentation
- [package.json](./package.json) - Dependencies & scripts
- [angular.json](./angular.json) - Angular configuration
- [tailwind.config.js](./tailwind.config.js) - Styling configuration

---

**Last Updated**: March 2, 2026  
**Version**: 1.0.0  
**Status**: Ready to Use ✅
