"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/lib/auth/useAuth";
import { useLogin, useRegister } from "@/app/lib/api/endpoints";
import { useRouter } from "next/navigation";

export const registerSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(8, { message: "Минимум 8 символов" }),
  name: z.string().min(1, { message: "Введите имя" }),
});

export type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const registerMutation = useRegister();
  const loginMutation = useLogin();

  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      await registerMutation.mutateAsync(data); // регистрация

      // Автоматический вход
      const loginRes = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });

      login(loginRes.accessToken); // сохраняем токен
      router.push("/bookings");    // редирект в защищённый раздел
    } catch (err: any) {
      alert(err.message || "Ошибка регистрации");
    }
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-8 space-y-6 bg-[#E6CFA9] rounded-lg shadow-lg"
    >
      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 font-semibold text-[#9A3F3F] text-lg"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`px-4 py-3 rounded border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#9A3F3F] ${
            errors.email ? "border-red-500" : "border-[#C1856D]"
          }`}
          placeholder="example@mail.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 font-semibold text-[#9A3F3F] text-lg"
        >
          Пароль
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`px-4 py-3 rounded border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#9A3F3F] ${
            errors.password ? "border-red-500" : "border-[#C1856D]"
          }`}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 font-medium">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || registerMutation.isPending || loginMutation.isPending}
        className="w-full bg-[#9A3F3F] text-[#FBF9D1] py-3 rounded-md font-semibold shadow-md hover:bg-[#C1856D] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting || registerMutation.isPending || loginMutation.isPending
          ? "Загрузка..."
          : "Зарегистрироваться"}
      </button>

      <p className="mt-6 text-center text-[#9A3F3F]">
        Есть аккаунт?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-semibold text-[#C1856D] hover:underline"
        >
          Войти!
        </button>
      </p>

    </form>

  );
}
