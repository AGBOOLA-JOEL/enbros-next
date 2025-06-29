import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

import { User, JwtPayload } from "@/types/forms.type";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  tokenExpiry: number | null;

  // Actions
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  checkTokenExpiry: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      tokenExpiry: null,

      login: (token: string, user: User) => {
        try {
          // Decode the JWT to get the actual expiration time
          const decoded = jwtDecode<JwtPayload>(token);
          const expiry = decoded.exp * 1000; // Convert to milliseconds

          set({
            user,
            accessToken: token,
            isAuthenticated: true,
            tokenExpiry: expiry,
          });

          // Also store in localStorage for API interceptor
          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", token);
            // Set cookie for middleware access
            document.cookie = `auth_token=${token}; path=/; max-age=${
              decoded.exp - Math.floor(Date.now() / 1000)
            }; SameSite=Strict`;
            document.cookie = `auth_user=${JSON.stringify(
              user
            )}; path=/; max-age=${
              decoded.exp - Math.floor(Date.now() / 1000)
            }; SameSite=Strict`;
          }
        } catch (error) {
          console.error("Failed to decode JWT:", error);
          // Fallback to 24 hours if JWT decoding fails
          const fallbackExpiry = Date.now() + 24 * 60 * 60 * 1000;

          set({
            user,
            accessToken: token,
            isAuthenticated: true,
            tokenExpiry: fallbackExpiry,
          });

          if (typeof window !== "undefined") {
            localStorage.setItem("access_token", token);
            // Set cookie for middleware access with fallback expiry
            const fallbackExpirySeconds = 24 * 60 * 60;
            document.cookie = `auth_token=${token}; path=/; max-age=${fallbackExpirySeconds}; SameSite=Strict`;
            document.cookie = `auth_user=${JSON.stringify(
              user
            )}; path=/; max-age=${fallbackExpirySeconds}; SameSite=Strict`;
          }
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          tokenExpiry: null,
        });

        // Remove from localStorage and cookies
        if (typeof window !== "undefined") {
          localStorage.removeItem("access_token");
          // Clear auth cookies
          document.cookie =
            "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie =
            "auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
      },

      updateUser: (user: User) => {
        set({ user });
      },

      checkTokenExpiry: () => {
        const { tokenExpiry } = get();
        if (!tokenExpiry) return false;

        const isExpired = Date.now() > tokenExpiry;

        if (isExpired) {
          get().logout();
        }

        return isExpired;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        tokenExpiry: state.tokenExpiry,
      }),
    }
  )
);

export default useAuthStore;
