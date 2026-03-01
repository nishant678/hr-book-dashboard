export interface Company {
  id: number;
  name: string;
  adminName: string;
  employeeCount: number;
  plan: string;
  status: 'active' | 'inactive' | 'suspended';
  createdDate: string;
  monthlyRevenue: number;
}

export interface CompanyStats {
  totalCompanies: number;
  activeCompanies: number;
  suspendedCompanies: number;
  totalEmployees: number;
  monthlyRevenue: number;
}
