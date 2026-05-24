"use client";
import { SWRConfig } from "swr";

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus:       false,
        revalidateOnReconnect:   true,
        errorRetryCount:         3,
        dedupingInterval:        30_000,
        focusThrottleInterval:   60_000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
