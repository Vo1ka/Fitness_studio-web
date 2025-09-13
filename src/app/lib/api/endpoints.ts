"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { apiFetch } from "./apiFetch";

// Типы данных

export type ClassType = {
  id: string;
  title: string;
  durationMinutes: number;
  intensity: "LOW" | "MEDIUM" | "HIGH";
};

export type Coach = {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
};

export type Session = {
  id: string;
  startsAt: string;
  capacity: number;
  price: number;
  classType: ClassType;
  coach: Coach;
};

export type SessionsResponse = {
  items: Session[];
  total: number;
  page: number;
  limit: number;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
};

export type RegisterResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: string;
  };
};

export type Booking = {
  id: string;
  status: "BOOKED" | "CANCELLED";
  createdAt: string;
  session: Session;
};

// Хуки

// Каталог типов занятий
export function useClassTypes() {
  return useQuery<ClassType[]>({
    queryKey: ["class-types"],
    queryFn: () => apiFetch<ClassType[]>("/catalog/class-types"),
    staleTime: 5 * 60 * 1000,
  });
}

// Каталог тренеров
export function useCoaches() {
  return useQuery<Coach[]>({
    queryKey: ["coaches"],
    queryFn: () => apiFetch<Coach[]>("/catalog/coaches"),
    staleTime: 5 * 60 * 1000,
  });
}

// Получение списка сессий с фильтрами и пагинацией
export function useSessions(params: {
  date?: string;
  classTypeId?: string;
  coachId?: string;
  page?: number;
  limit?: number;
}) {
  const qs = new URLSearchParams();
  if (params.date) qs.set("date", params.date);
  if (params.classTypeId) qs.set("classTypeId", params.classTypeId);
  if (params.coachId) qs.set("coachId", params.coachId);
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));

  return useQuery<SessionsResponse>({
    queryKey: ["sessions", params],
    queryFn: () => apiFetch<SessionsResponse>(`/sessions?${qs.toString()}`),
  });
}

// Хук для логина
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

// Хук для регистрации
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

// Создание брони
export function useCreateBooking() {
  return useMutation<void, Error, { sessionId: string }>({
    mutationFn: (data) =>
      apiFetch<void>("/bookings", {
        method: "POST",
        body: JSON.stringify(data),
        auth: true,
      }),
  });
}

// Получение моих броней
export function useMyBookings(params?: { page?: number; limit?: number }) {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));
  const query = qs.toString() ? `?${qs.toString()}` : "";

  return useQuery<{
    items: Booking[];
    total: number;
    page: number;
    limit: number;
  }>({
    queryKey: ["bookings", "me", params],
    queryFn: () => apiFetch(`/bookings/my${query}`, { auth: true }),
  });
}

// Отмена брони
export function useCancelBooking() {
  return useMutation<void, Error, string>({
    mutationFn: (bookingId) =>
      apiFetch(`/bookings/${bookingId}/cancel`, {
        method: "POST",
        auth: true,
      }),
  });
}
