import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Company, CompanyStats } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private companies: Company[] = [
        {
            id: 1,
            name: 'Tech Solutions Inc',
            adminName: 'John Smith',
            employeeCount: 250,
            plan: 'Enterprise',
            status: 'active',
            createdDate: '2023-01-15',
            monthlyRevenue: 45000
        },
        {
            id: 2,
            name: 'Digital Innovations Ltd',
            adminName: 'Sarah Johnson',
            employeeCount: 180,
            plan: 'Professional',
            status: 'active',
            createdDate: '2023-03-20',
            monthlyRevenue: 32000
        },
        {
            id: 3,
            name: 'Global Services Co',
            adminName: 'Michael Brown',
            employeeCount: 420,
            plan: 'Enterprise',
            status: 'active',
            createdDate: '2022-11-10',
            monthlyRevenue: 72000
        },
        {
            id: 4,
            name: 'StartUp Ventures',
            adminName: 'Emily Davis',
            employeeCount: 45,
            plan: 'Starter',
            status: 'active',
            createdDate: '2024-01-05',
            monthlyRevenue: 8000
        },
        {
            id: 5,
            name: 'Enterprise Solutions',
            adminName: 'Robert Wilson',
            employeeCount: 380,
            plan: 'Enterprise',
            status: 'suspended',
            createdDate: '2023-06-12',
            monthlyRevenue: 0
        }
    ];

    constructor(private http: HttpClient) { }

    getCompanies(): Observable<Company[]> {
        return of(this.companies);
    }

    getCompanyStats(): Observable<CompanyStats> {
        const stats: CompanyStats = {
            totalCompanies: this.companies.length,
            activeCompanies: this.companies.filter(c => c.status === 'active').length,
            suspendedCompanies: this.companies.filter(c => c.status === 'suspended').length,
            totalEmployees: this.companies.reduce((sum, c) => sum + c.employeeCount, 0),
            monthlyRevenue: this.companies.reduce((sum, c) => sum + c.monthlyRevenue, 0)
        };
        return of(stats);
    }

    getCompanyById(id: number): Observable<Company | undefined> {
        return of(this.companies.find(c => c.id === id));
    }

    suspendCompany(id: number): Observable<void> {
        const company = this.companies.find(c => c.id === id);
        if (company) {
            company.status = 'suspended';
        }
        return of(void 0);
    }

    activateCompany(id: number): Observable<void> {
        const company = this.companies.find(c => c.id === id);
        if (company) {
            company.status = 'active';
        }
        return of(void 0);
    }
}
