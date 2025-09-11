"use client";

import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

type RegisterRequest = {
    email: string,
    password: string
    name: string;
};

type RegisterResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
  };
};


export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (credentials) =>
      apiFetch<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      }),
  });
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (data) =>
      apiFetch<RegisterResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
  });
}