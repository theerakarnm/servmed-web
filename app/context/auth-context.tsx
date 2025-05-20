import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "~/lib/auth-client";
import { jnavigate } from "~/lib/utils";

type User = {
  id: string;
  email: string;
  emailVerified: boolean;
  username: string;
  name: string;
  image: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
};

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on first render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem("user");
        }
      }
    }
  }, []);

  const login = async (newUser: {
    username: string;
    password: string;
  }) => {
    const { data, error } = await authClient.signIn.username({
      password: newUser.password,
      username: newUser.username,
      fetchOptions: {
        onError: () => {
          console.error("Login failed");
        },
        onSuccess: () => {
          jnavigate({ path: "/" });
        },
      },
    });
    if (!data) {
      console.error("Login failed", error);
      return;
    }
    setUser(data.user);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          jnavigate({ path: '/login' })
        }
      }
    });
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

