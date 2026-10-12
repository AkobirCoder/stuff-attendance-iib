import { AuthSession, User } from '@/types';

const TOKEN_KEY = 'attendance_auth_token';
const USER_KEY = 'attendance_auth_user';

export const authService = {
  /**
   * Demo Authentication logic
   * Works with demo credentials (e.g., admin / admin123, operator / 123456, or any non-empty input)
   */
  async login(username: string, password: string): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 400)); // realistic network delay

    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      throw new Error('Логин ва паролни киритинг');
    }

    if (password.length < 4) {
      throw new Error('Парол камида 4 та белгидан иборат бўлиши керак');
    }

    const mockUser: User = {
      id: 'usr-admin-01',
      username: trimmedUser,
      name: trimmedUser === 'admin' ? 'Азизбек Шавкатович' : trimmedUser,
      role: 'Масъул навбатчи',
      rank: 'Подполковник',
      department: 'Бошқарма аппарати',
    };

    const session: AuthSession = {
      user: mockUser,
      token: 'demo-jwt-token-' + Date.now(),
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, session.token);
      localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    }

    return session;
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
