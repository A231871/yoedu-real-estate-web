import { useState, type ReactNode } from 'react';
import { getUser } from '@/data/client-storage';
import { AuthContext, type User } from './AuthContext';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    return getUser();
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
