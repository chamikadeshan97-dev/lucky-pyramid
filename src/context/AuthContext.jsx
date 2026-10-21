import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

export const AuthContext = createContext(null);

// Read stored customer
function readUser() {
  try {
    const token = sessionStorage.getItem("lp_token");
    const raw = sessionStorage.getItem("lp_user");

    if (!token || !raw) return null;

    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [loading, setLoading] = useState(false);

  // Mobile OTP login
  const loginWithToken = useCallback(
    async (accessToken, customer) => {
      setLoading(true);

      try {
        if (!accessToken || !customer) {
          throw new Error("Invalid authentication response");
        }

        sessionStorage.setItem("lp_token", accessToken);
        sessionStorage.setItem(
          "lp_user",
          JSON.stringify(customer)
        );

        setUser(customer);

        return customer;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Logout
  const logout = useCallback(() => {
    sessionStorage.removeItem("lp_token");
    sessionStorage.removeItem("lp_user");

    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      loginWithToken,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user, loading, loginWithToken, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}