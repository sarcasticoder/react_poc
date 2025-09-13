// Auth Repository - Mock authentication with localStorage
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

class AuthRepository {
  private readonly SESSION_KEY = 'admin_session';
  private readonly MOCK_USERS: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Admin'
    },
    {
      id: '2', 
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Editor'
    },
    {
      id: '3',
      name: 'Jane Smith', 
      email: 'jane@example.com',
      role: 'Viewer'
    }
  ];

  // Mock login - accepts any email/password for POC
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For POC, accept any email/password combination
    const user = this.MOCK_USERS.find(u => u.email === credentials.email) || this.MOCK_USERS[0];
    
    const session: AuthSession = {
      user,
      token: this.generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    // Store session in localStorage
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    
    return session;
  }

  // Get current session from localStorage
  getCurrentSession(): AuthSession | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session: AuthSession = JSON.parse(sessionData);
      
      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        this.logout();
        return null;
      }

      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      this.logout();
      return null;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    const session = this.getCurrentSession();
    return session?.user || null;
  }

  // Logout - clear session
  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Generate mock token
  private generateToken(): string {
    return 'mock_token_' + Math.random().toString(36).substr(2, 9);
  }
}

// Export singleton instance
export const authRepo = new AuthRepository();
