"use client";
import { Toaster } from "sonner";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster richColors expand={false} duration={2000} />
    </>
  );
}
