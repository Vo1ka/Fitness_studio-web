"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { useState } from "react";

type Subscription = {
  id: string;
  title: string;
  description: string;
  durationMonths: number;
  price: number;
};

const mockSubscriptions: Subscription[] = [
  {
    id: "sub1",
    title: "Базовый абонемент",
    description: "Доступ к группе занятий и тренажёрному залу.",
    durationMonths: 1,
    price: 3000,
  },
  {
    id: "sub2",
    title: "Стандартный абонемент",
    description: "Все базовые возможности + персональные тренировки 2 раза в месяц.",
    durationMonths: 3,
    price: 8000,
  },
  {
    id: "sub3",
    title: "Премиум абонемент",
    description: "Полный доступ ко всем услугам студии без ограничений.",
    durationMonths: 12,
    price: 16000,
  },
];

export default function SubscriptionsPage() {
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions);

  return (
    <>
    <main className="min-h-screen bg-[#FBF9D1] text-[#9A3F3F] px-8 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 border-b-4 border-[#9A3F3F] pb-3 inline-block">
        Абонементы
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="bg-[#E6CFA9] rounded-lg p-6 shadow-md flex flex-col justify-between"
          >
            <h2 className="text-2xl font-semibold mb-2">{sub.title}</h2>
            <p className="mb-4 flex-grow">{sub.description}</p>
            <div className="text-lg font-bold">
              Цена: ₽{sub.price} / {sub.durationMonths} мес.
            </div>
            <button className="mt-6 bg-[#9A3F3F] text-[#FBF9D1] py-2 rounded hover:bg-[#C1856D] transition-colors duration-300">
              Купить
            </button>
          </div>
        ))}
      </section>
    </main>
    </>
  );
}
