"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    hydrate(); // ✅ restore auth state from cookies
  }, [hydrate]);

  return <>{children}</>;
}
