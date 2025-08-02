import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  joinDate: string;
  robux: number;
  tickets: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем сохраненного пользователя при загрузке
    const savedUser = localStorage.getItem('roblox_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
        localStorage.removeItem('roblox_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Проверяем demo пользователей или создаем нового
    const demoUsers = [
      { username: 'guest', password: 'guest' },
      { username: 'player1', password: '123456' },
      { username: 'robloxfan', password: 'password' }
    ];
    
    const validUser = demoUsers.find(u => u.username === username && u.password === password);
    
    if (validUser || username === 'demo') {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: username,
        email: `${username}@roblox.com`,
        joinDate: new Date().toISOString().split('T')[0],
        robux: Math.floor(Math.random() * 1000) + 100,
        tickets: Math.floor(Math.random() * 50) + 10
      };
      
      setUser(newUser);
      localStorage.setItem('roblox_user', JSON.stringify(newUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    
    // Имитация API запроса
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Проверяем, не занято ли имя пользователя
    const existingUsers = ['guest', 'admin', 'roblox', 'moderator'];
    if (existingUsers.includes(userData.username.toLowerCase())) {
      setLoading(false);
      return false;
    }
    
    // Создаем нового пользователя
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: userData.username,
      email: userData.email,
      joinDate: new Date().toISOString().split('T')[0],
      robux: 10, // Стартовые robux для новых пользователей
      tickets: 10 // Стартовые tickets
    };
    
    setUser(newUser);
    localStorage.setItem('roblox_user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('roblox_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}