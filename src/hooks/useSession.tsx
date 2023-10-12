import { useEffect, useState } from "react";
import { loginService } from "../services/auth/login.service";
import toast from "react-hot-toast";
import { useLocalStorage } from "./useLocalStorage";
import { authRefreshService } from "../services/auth/refresh.service";

export interface SessionState {
  username: string;
  token: string;
}

export const useSession = () => {
  const { setItem, removeItem, getItem } = useLocalStorage();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionState | null>(null);

  // Recover session from localStorage on first render
  useEffect(() => {
    recoverSession();
  }, []);

  const recoverSession = async () => {
    const username = getItem("username");
    const token = getItem("token");

    if (!username || !token) {
      setLoading(false);
      return;
    }

    const session = { username, token };
    setSession(session);
  };

  // Update loading state when session is set
  useEffect(() => {
    if (session) setLoading(false);
  }, [session]);

  const updateSession = (username: string, token: string) => {
    const updatedSession = { username, token };
    setSession(updatedSession);
    persistSession(updatedSession);
  };

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);

    const token = getItem("token");

    if (token) {
      const refreshResponse = await authRefreshService(token);
      if (refreshResponse.success) {
        updateSession(username, refreshResponse.token);
        toast.success("Session started successfully.");
        return true;
      } else {
        toast.error(refreshResponse.msg);
        setLoading(false);
        return false;
      }
    } else {
      const { success, ...res } = await loginService({ username, password });
      if (!success) {
        toast.error(res.msg);
        setLoading(false);
        return false;
      }

      updateSession(username, res.token);
      toast.success(res.msg);
      return true;
    }
  };

  const persistSession = (session: SessionState) => {
    setItem("username", session.username);
    setItem("token", session.token);
  };

  const logout = () => {
    setSession(null);
    removeItem("username");
    removeItem("token");
  };

  return {
    loading,
    session,
    login,
    logout,
    updateSession
  };
};
