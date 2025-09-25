// app/stores/signupStore.ts
import { create } from "zustand";

interface SignupState {
  step: number;            // current step in the signup flow
  fullName: string;        // user's full name
  email: string;           // user's email
  password: string;        // user's password
  otp: string;             // OTP for verification
  workspaceName: string;   // workspace name for step 3
  role: string;            // role for step 3

  // Actions
  setStep: (step: number) => void;
  setFullName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setOtp: (otp: string) => void;
  setWorkspaceName: (name: string) => void;
  setRole: (role: string) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  step: 1,
  fullName: "",
  email: "",
  password: "",
  otp: "",
  workspaceName: "",
  role: "",

  setStep: (step) => set({ step }),
  setFullName: (fullName) => set({ fullName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setOtp: (otp) => set({ otp }),
  setWorkspaceName: (workspaceName) => set({ workspaceName }),
  setRole: (role) => set({ role }),
  reset: () =>
    set({
      step: 1,
      fullName: "",
      email: "",
      password: "",
      otp: "",
      workspaceName: "",
      role: "",
    }),
}));
