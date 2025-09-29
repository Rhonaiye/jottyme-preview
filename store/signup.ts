import { create } from "zustand";

interface SignupState {
  step: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  otp: string;
  workspaceName: string;
  role: string;

  setStep: (step: number) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setOtp: (otp: string) => void;
  setWorkspaceName: (name: string) => void;
  setRole: (role: string) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupState>((set) => ({
  step: 1,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  otp: "",
  workspaceName: "",
  role: "",

  setStep: (step) => set({ step }),
  setFirstName: (firstName) => set({ firstName }),
  setLastName: (lastName) => set({ lastName }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setOtp: (otp) => set({ otp }),
  setWorkspaceName: (workspaceName) => set({ workspaceName }),
  setRole: (role) => set({ role }),
  reset: () =>
    set({
      step: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      otp: "",
      workspaceName: "",
      role: "",
    }),
}));

