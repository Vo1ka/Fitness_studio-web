"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/lib/auth/useAuth";
import { useLogin } from "@/app/lib/api/endpoints";

const loginSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(8, { message: "Минимум 8 символов" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const mutation = useLogin();
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await mutation.mutateAsync(data);
      login(res.accessToken);
      // Можно сделать редирект на главную или предыдущую страницу
    } catch (err: any) {
      // Обработка ошибок API
      alert(err.message || "Ошибка входа");
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

      <button type="submit" disabled={isSubmitting || mutation.isPending} className="btn">
        {isSubmitting || mutation.isPending ? "Вход..." : "Войти"}
      </button>
    </form>
  );
}
