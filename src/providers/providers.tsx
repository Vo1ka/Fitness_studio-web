"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PrivateRouteProvider from "./PrivateRouteProvider";
import React from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* Здесь не обязательно весь app оборачивать в PrivateRouteProvider,
          только приватные части */}
      {children}
    </QueryClientProvider>
  );
}