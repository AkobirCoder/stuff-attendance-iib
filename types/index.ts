export type AttendanceStatus = 'present' | 'late' | 'absent' | 'vacation' | 'duty';

export interface Employee {
  id: string;
  rank: string; // Унвони (Майор, Капитан, ...)
  fullName: string; // Ф.И.Ш
  position: string; // Эгаллаб турган лавозими (штат бўйича)
  departmentId: string; // Bo'lim identifikatori
  departmentName: string; // Bo'lim nomi (Кирилл)
  eveningInstructionLocation: string; // Кечки йўриқномада қаерда эканлиги
  duration: string; // Муддати (вақт oralig'i yoki muddat)
  note: string; // Изоҳ
  status: AttendanceStatus;
  phone?: string;
  badgeNumber?: string;
}

export interface DashboardStats {
  totalEmployees: number; // Jami xodimlar
  presentToday: number; // Bugun ishda
  lateToday: number; // Kechikkanlar
  absentToday: number; // Ishda yo'qlar
  onVacation: number; // Ta'tildagi xodimlar
}

export interface NavigationSubItem {
  id: string;
  title: string;
  route: string;
}

export interface NavigationItem {
  id: string;
  number: number;
  title: string;
  shortTitle?: string;
  route: string;
  iconName: string;
  badge?: number | string;
  children?: NavigationSubItem[];
}

export interface EmployeeFilter {
  searchQuery: string;
  position: string;
  location: string;
  duration: string;
  departmentId?: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  rank: string;
  department: string;
  avatarUrl?: string;
}

export interface AuthSession {
  user: User;
  token: string;
}
