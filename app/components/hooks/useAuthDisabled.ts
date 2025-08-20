"use client";

import { useState, useCallback } from "react";

type LoginInput = { email: string; password: string };
type RegisterInput = { name: string; lastName: string; email: string; password: string };

const TOKEN_KEY = "token";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  };

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  };

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
  }, []);

  const login = useCallback(async ({ email, password }: LoginInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, isRegister: false }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Credenciales inválidas");
      }

      const data = await res.json();
      if (data.token) {
        saveToken(data.token);
      }
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ name, lastName, email, password }: RegisterInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastName, email, password, isRegister: true }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "No se pudo registrar");
      }

      return await res.json();
    } finally {
      setLoading(false);
    }
  }, []);

  const authFetch = useCallback(async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const token = getToken();
    const headers = new Headers(init.headers || {});
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  }, []);

  return { loading, login, register, logout, authFetch, getToken };
}
