import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock user data (would be replaced by actual API calls)
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password123', // In a real app, this would be hashed
    role: 'customer' as const,
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin' as const,
  },
];

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for saved login on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ecommerceUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('ecommerceUser');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call with mock data
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      toast.error('Invalid email or password');
      throw new Error('Invalid email or password');
    }

    // Create a clean user object without the password
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    
    // Save to localStorage
    localStorage.setItem('ecommerceUser', JSON.stringify(userWithoutPassword));
    toast.success(`Welcome back, ${userWithoutPassword.name}!`);
  };

  const register = async (name: string, email: string, password: string) => {
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      toast.error('Email already in use');
      throw new Error('Email already in use');
    }

    // In a real app, we would send this to an API
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      password,
      role: 'customer' as const,
    };

    // Save user (would be done by API in real app)
    mockUsers.push(newUser);
    
    // Log the user in
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    
    // Save to localStorage
    localStorage.setItem('ecommerceUser', JSON.stringify(userWithoutPassword));
    toast.success('Registration successful!');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecommerceUser');
    toast.info('You have been logged out');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login, 
        register, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
