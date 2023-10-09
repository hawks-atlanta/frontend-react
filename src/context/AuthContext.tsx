import { ReactNode, createContext } from "react";
import { SessionState, useSession } from "../hooks/useSession";

interface AuthContextState {
  session: SessionState | null;
  isSessionLoading: boolean;
  login: (_username: string, _password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextState>({
  session: null,
  isSessionLoading: true,
  login: async () => false,
  logout: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { session, loading, login, logout } = useSession();

  return (
    <AuthContext.Provider
      value={{
        session,
        isSessionLoading: loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
