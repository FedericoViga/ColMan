"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: null,
  profile: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  children,
  serverUser = null,
  serverProfile = null,
}) {
  const value = { user: serverUser, profile: serverProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
