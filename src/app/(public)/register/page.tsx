"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/lib/auth/useAuth";
import { useLogin, useRegister } from "@/app/lib/api/endpoints";
import { useRouter } from "next/router";
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
      router.push("/sessions");    // редирект в защищённый раздел
    } catch (err: any) {
      alert(err.message || "Ошибка регистрации");
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} className="input" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Пароль</label>
        <input id="password" type="password" {...register("password")} className="input" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>

      <button type="submit" 
      disabled={isSubmitting || registerMutation.isPending || loginMutation.isPending} 
      className="btn">
        {isSubmitting || registerMutation.isPending 
        || loginMutation.isPending ? 
        "Загрузка..." : 
        "Зарегистрироваться"}
      </button>
    </form>
  );
}
