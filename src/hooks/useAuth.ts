"use client";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import useModalStore from "@/lib/store/modal-store";
import { useGenselectors } from "@/lib/store/general-store";
import useAuthStore from "@/lib/store/auth-store";
import {
  AuthResponse,
  ErrorWithResponse,
  LoginData,
  RegisterData,
} from "@/types/forms.type";

export const useAuth = () => {
  const { openModal, closeModal } = useModalStore();
  const openToast = useGenselectors.use.openToast();
  const router = useRouter();

  // Auth store
  const { login, logout, isAuthenticated, user, checkTokenExpiry } =
    useAuthStore();

  // Check token expiry on mount and set up periodic checks
  useEffect(() => {
    checkTokenExpiry();

    // Check token expiry every 5 minutes
    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkTokenExpiry]);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      openModal("loading");
      const res = await api.post("/auth/login", data);
      return res.data;
    },
    onSuccess: async (data: AuthResponse) => {
      const { access_token, user } = data;
      // Complete login process first
      login(access_token, user);
      // Then update UI
      closeModal();
      openToast("Login successful", 3000);
      router.push("/"); // Redirect to home page
    },
    onError: (error: ErrorWithResponse) => {
      closeModal();
      const message =
        error?.response?.data?.message || "An unexpected error occurred";
      openToast(message, 4000);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      openModal("loading");
      const res = await api.post("/auth/register", data);
      return res.data;
    },
    onSuccess: async (data: { message: string }) => {
      const { message } = data;
      closeModal();
      openToast(message, 4000);
      router.replace("/login");
    },
    onError: (error: ErrorWithResponse) => {
      closeModal();
      const message =
        error?.response?.data?.message || "An unexpected error occurred";
      openToast(message, 4000);
    },
  });

  const handleLogout = () => {
    logout();
    openToast("Logged out successfully", 3000);
    router.replace("/");
  };

  return {
    // Mutations
    registerMutation,
    loginMutation,

    // Auth state
    isAuthenticated,
    user,

    // Actions
    logout: handleLogout,
    checkTokenExpiry,
  };
};
