"use client";

import { create } from "zustand";
import { UserState } from "./types";

const safeJsonParse: (value: string | null) => any = (value: string | null) => {
  if (!value || value === "undefined" || value === "null") return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  rememberMe: false,

  setUser: (user, token, remember) => {
    if (!token || !user) return;

    const storage: Storage = remember ? localStorage : sessionStorage;

    storage.setItem("user", JSON.stringify(user));
    storage.setItem("token", token);

    set({
      user,
      token,
      rememberMe: remember,
    });
  },

  getUser: () => {
    if (typeof window === "undefined") return;

    const localToken: string | null = localStorage.getItem("token");
    const sessionToken: string | null = sessionStorage.getItem("token");

    const token: string | null = localToken || sessionToken;

    const user =
      safeJsonParse(localStorage.getItem("user")) ||
      safeJsonParse(sessionStorage.getItem("user"));

    set({
      token: token && token !== "undefined" ? token : null,
      user,
      rememberMe: !!localToken,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    set({
      user: null,
      token: null,
      rememberMe: false,
    });
  },
}));