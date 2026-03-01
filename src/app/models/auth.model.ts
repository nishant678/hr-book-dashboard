export enum UserRole {
  MASTER_ADMIN = 'MASTER_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  EMPLOYEE = 'EMPLOYEE'
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  role: UserRole;
  id: number;
}

export interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
}

export interface UserInfo {
  id: number;
  email: string;
  role: UserRole;
}
