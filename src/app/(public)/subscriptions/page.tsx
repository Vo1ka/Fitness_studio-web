"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { SubscriptionCard } from "@/components/SubscriptionCard/SubscriptionCard";
import { useState } from "react";

type Subscription = {
  id: string;
  title: string;
  description: string;
  durationMonths: number;
  price: number;
  popular?: boolean;
  features: string[];
};

const mockSubscriptions: Subscription[] = [
  {
    id: "sub1",
    title: "Базовый абонемент",
    description: "Доступ к группе занятий и тренажёрному залу.",
    durationMonths: 1,
    price: 3000,
    features: [
      "Доступ к тренажёрному залу",
      "Групповые занятия",
      "Распорядок работы студии",
    ],
  },
  {
    id: "sub2",
    title: "Стандартный абонемент",
    description: "Все базовые возможности + персональные тренировки 2 раза в месяц.",
    durationMonths: 3,
    price: 8000,
    features: [
      "Все из базового",
      "2 персональные тренировки в месяц",
      "Доступ к сауне",
      "Приоритетное бронирование",
    ],
  },
  {
    id: "sub3",
    title: "Премиум абонемент",
    description: "Полный доступ ко всем услугам студии без ограничений.",
    durationMonths: 12,
    price: 16000,
    popular: true,
    features: [
      "Безлимитный доступ ко всем залам",
      "Персональные тренировки 4 раза в месяц",
      "Эксклюзивные мастер-классы",
      "Доступ к VIP-зоне",
      "Персональный тренер и диетолог",
    ],
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
          <SubscriptionCard key={sub.id}
            title={sub.title}
            description={sub.description}
            durationMonths={sub.durationMonths}
            price={sub.price}
            popular={sub.popular}
            features={sub.features}
          />
        ))}
      </section>
    </main>
    </>
  );
}
