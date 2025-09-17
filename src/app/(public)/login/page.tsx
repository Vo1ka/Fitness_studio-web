"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/lib/auth/useAuth";
import { useLogin } from "@/app/lib/api/endpoints";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(8, { message: "Минимум 8 символов" }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter()
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
    <>
     <main className="min-h-[calc(100vh-8rem)] bg-[#FBF9D1] text-[#9A3F3F] flex flex-col items-center justify-center px-6 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#E6CFA9] rounded-lg shadow-lg p-10 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Вход в аккаунт</h1>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded ${
                errors.email ? "border-red-500" : "border-[#C1856D]"
              } focus:outline-none focus:ring-2 focus:ring-[#9A3F3F]`}
            />
            {errors.email && (
              <p className="mt-1 text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-semibold">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className={`w-full px-4 py-2 border rounded ${
                errors.password ? "border-red-500" : "border-[#C1856D]"
              } focus:outline-none focus:ring-2 focus:ring-[#9A3F3F]`}
            />
            {errors.password && (
              <p className="mt-1 text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
            className="w-full bg-[#9A3F3F] text-[#FBF9D1] py-3 rounded font-semibold hover:bg-[#C1856D] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || mutation.isPending ? "Входим..." : "Войти"}
          </button>

          <p className="mt-6 text-center text-[#9A3F3F]">
            Нет аккаунта?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="font-semibold text-[#C1856D] hover:underline"
            >
              Зарегистрируйтесь!
            </button>
          </p>
        </form>
      </main>

    </>
  );

}
