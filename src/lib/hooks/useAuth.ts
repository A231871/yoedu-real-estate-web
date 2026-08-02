import { useContext } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';
import type { User } from '@/context/auth/AuthContext';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/api/openapi-generated';
import { getAccessToken, getUser } from '@/lib/data/client-storage';
import {
  login as authLogin,
  register as authRegister,
  verify as authVerify,
  logout as authLogout,
} from '@/lib/data/auth';
export interface UseAuthResult {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  register: (data: RegisterRequest) => Promise<string>;
  verify: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = (): UseAuthResult => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user, setUser, isLoading, setIsLoading } = context;

  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const authData = await authLogin(data);
      if (authData.userId && authData.email) {
        setUser({
          userId: authData.userId,
          email: authData.email,
        });
      }
      return authData;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<string> => {
    setIsLoading(true);
    try {
      return await authRegister(data);
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (token: string) => {
    setIsLoading(true);
    try {
      await authVerify(token);
      const userData = getUser();

      if (userData?.userId && userData?.email) {
        setUser({
          userId: userData.userId,
          email: userData.email,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authLogout();
    } finally {
      setUser(null);
    }
  };

  return {
    user,
    accessToken: getAccessToken(),
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    verify,
    logout,
  };
};
