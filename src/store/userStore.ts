"use client";

import { create, StoreApi, UseBoundStore } from "zustand";
import { UserState } from "./types";

const getStorage: () => Storage | null = () => {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("token") ? localStorage : sessionStorage;
};

export const useUserStore: UseBoundStore<StoreApi<UserState>> = create<UserState>((set) => ({
  user: null,
  token: null,
  rememberMe: false,

  setUser: (user, token, remember) => {
    const storage = remember ? localStorage : sessionStorage;

    storage.setItem("user", JSON.stringify(user));
    storage.setItem("token", token);

    set({ user, token, rememberMe: remember });
  },

  getUser: (): void => {
    if (typeof window === "undefined") return;

    const storage: Storage | null = getStorage();
    if (!storage) return;

    const token: string | null = storage.getItem("token");
    const user: string | null = storage.getItem("user");

    set({
      token,
      user: user ? JSON.parse(user) : null,
      rememberMe: storage === localStorage,
    });
  },

  logout: (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    set({ user: null, token: null, rememberMe: false });
  },
}));