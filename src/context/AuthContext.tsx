/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '../api/openapi-generated';
import { authenticationApi } from '../api/client';

export interface User {
  userId: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<AuthResponse>;
  register: (data: RegisterRequest) => Promise<string>;
  verify: (token: string) => Promise<AuthResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'yoedu_access_token';
const USER_KEY = 'yoedu_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(TOKEN_KEY, accessToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [accessToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  const setAuthSession = (authData: AuthResponse) => {
    if (authData.accessToken) {
      setAccessToken(authData.accessToken);
    }
    if (authData.userId && authData.email) {
      const newUser: User = {
        userId: authData.userId,
        email: authData.email,
      };
      setUser(newUser);
    }
  };

  const login = async (data: LoginRequest): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      // AuthenticationApi uses useSingleRequestParameter=true: wrap in { loginRequest: ... }
      const response = await authenticationApi.login({ loginRequest: data });
      const apiResponse = response.data;
      if (apiResponse.data) {
        setAuthSession(apiResponse.data);
        return apiResponse.data;
      }
      throw new Error(apiResponse.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest): Promise<string> => {
    setIsLoading(true);
    try {
      const response = await authenticationApi.register({ registerRequest: data });
      const apiResponse = response.data;
      return apiResponse.message || 'Đăng ký thành công. Vui lòng kiểm tra email để xác minh tài khoản.';
    } finally {
      setIsLoading(false);
    }
  };

  const verify = async (token: string): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const response = await authenticationApi.verify({ token });
      const apiResponse = response.data;
      if (apiResponse.data) {
        setAuthSession(apiResponse.data);
        return apiResponse.data;
      }
      throw new Error(apiResponse.message || 'Xác minh tài khoản thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken && !!user,
        isLoading,
        login,
        register,
        verify,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
