"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Пример провайдера/компонента-обёртки для приватных маршрутов
// Проверяет наличие accessToken (можно заменить на контекст или Zustand)
// Если токена нет — редиректит на /login

type PrivateRouteProviderProps = {
  children: ReactNode;
};

export default function PrivateRouteProvider({ children }: PrivateRouteProviderProps) {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Здесь можно получить токен из sessionStorage/localStorage или из контекста
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      router.replace("/login");
      return;
    }

    // Можно добавить проверку валидности токена или вызвать refresh
    setIsAuthenticated(true);
    setIsAuthChecked(true);
  }, [router]);

  if (!isAuthChecked) {
    // Пока проверяем авторизацию, показываем лоадер или пустой экран
    return <div style={{ padding: 24, textAlign: "center" }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Если не авторизованы — редирект уже произошёл, можно ничего не рендерить
    return null;
  }

  // Если авторизованы — рендерим дочерние компоненты
  return <>{children}</>;
}
