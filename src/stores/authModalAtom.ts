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
  openModal: (type = "login") => set({ isOpen: true, type }),
  closeModal: () => set({ isOpen: false }),
}));
