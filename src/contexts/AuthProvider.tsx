import { createContext, ReactNode, useContext, useState } from 'react';

import { UsersProps } from '@/types/types';

interface AuthContextValue {
  user: UsersProps | null;
  setUser: React.Dispatch<React.SetStateAction<UsersProps | null>>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsersProps | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('반드시 AuthProvider 안에서 사용해야 합니다.');
  }

  return context;
}
