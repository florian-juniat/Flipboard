import { createContext, useContext } from 'react';

export const AuthContext = createContext();

// For functionnal components
export function useAuth() {
  return useContext(AuthContext);
}
