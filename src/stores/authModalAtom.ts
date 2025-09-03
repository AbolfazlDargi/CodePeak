"use client";
import { create } from "zustand";

type AuthState = {
  isOpen: boolean;
  type: "login" | "register" | "forgetPassword";
  openModal: (type?: "login" | "register" | "forgetPassword") => void;
  closeModal: () => void;
};


export const useAuthStore = create<AuthState>((set) => ({
  isOpen: false,
  type: "login",
  setAuthModal: (data: AuthState | Partial<AuthState>) => set((prev) => ({ ...prev, ...data })),
  openModal: (type = "login") => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false }),
}));


