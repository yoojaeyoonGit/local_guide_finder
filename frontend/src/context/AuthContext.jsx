import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const res = await fetch('/api/v1/auth/me/', { credentials: 'include' });
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    (async () => {
      const ok = await fetchMe();
      if (!ok) {
        const refreshRes = await fetch('/api/v1/auth/refresh/', {
          method: 'POST',
          credentials: 'include',
        });
        if (refreshRes.ok) {
          await fetchMe();
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    })();
  }, [fetchMe]);

  const login = useCallback(async (email, password) => {
    const res = await fetch('/api/v1/auth/login/', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.detail || '이메일 또는 비밀번호를 확인해주세요.');
    }

    const data = await res.json();
    setUser(data);
    return data;
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/v1/auth/logout/', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
