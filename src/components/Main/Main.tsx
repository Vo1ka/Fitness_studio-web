"use client";

import Link from "next/link";
import { Testimonial } from "../Testimonials/Testimonials";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { useEffect, useState } from "react";

const testimonialsData = [
  { name: "Анна", text: "Занимаюсь здесь уже полгода, и результаты превзошли все ожидания!" },
  { name: "Иван", text: "Отличная атмосфера и профессиональные тренеры. Рекомендую всем!" },
  { name: "Мария", text: "Люблю разнообразие занятий и удобное расписание." },
];

const Main = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#FBF9D1] text-[#9A3F3F] px-8 py-12 flex flex-col gap-20 select-none">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 animate-fadeIn">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            Добро пожаловать в <span className="text-[#C1856D]">Fitness Studio</span>
          </h1>
          <p className="text-xl max-w-lg">
            Твоя студия для здоровья и силы. Запишись на занятия, тренируйся с лучшими тренерами и достигай целей!
          </p>
          <Link
            href="/schedule"
            className="inline-block bg-[#9A3F3F] text-[#FBF9D1] px-8 py-3 rounded-md font-semibold shadow-md hover:bg-[#C1856D] transition-colors duration-300"
          >
            Посмотреть расписание
          </Link>
        </div>
        <div className="flex-1">
          <img
            src="/hero-fitness.jpg"
            alt="Fitness Studio"
            className="rounded-lg shadow-lg object-cover w-full h-80 md:h-96"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto bg-[#E6CFA9] rounded-lg p-10 shadow-inner text-[#9A3F3F]">
        <h2 className="text-4xl font-bold mb-6 border-b-4 border-[#9A3F3F] pb-2 inline-block">
          О нас
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <p className="flex-1 text-lg leading-relaxed">
            Fitness Studio — это место, где каждый найдёт подходящие занятия для себя. Мы предлагаем широкий спектр тренировок:
            от йоги до высокоинтенсивных интервальных тренировок.
          </p>
          <p className="flex-1 text-lg leading-relaxed">
            Наши тренеры — профессионалы с опытом и вниманием к каждому. Создаём комфортную атмосферу для ваших тренировок.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard
          title="Йога"
          description="Укрепляйте тело и душу с нашими опытными инструкторами."
          icon="🧘‍♀️"
          className="hover:scale-105 transition-transform duration-300"
        />
        <ServiceCard
          title="HIIT"
          description="Интенсивные тренировки для максимального результата за короткое время."
          icon="🔥"
          className="hover:scale-105 transition-transform duration-300"
        />
        <ServiceCard
          title="Персональные тренировки"
          description="Индивидуальный подход для достижения ваших целей."
          icon="🏋️‍♂️"
          className="hover:scale-105 transition-transform duration-300"
        />
      </section>

      {/* Testimonials Section */}
      <section className="max-w-5xl mx-auto bg-[#C1856D] rounded-lg p-10 shadow-lg text-[#FBF9D1] relative overflow-hidden">
        <h2 className="text-4xl font-bold mb-6 border-b-4 border-[#FBF9D1] pb-2 inline-block">
          Отзывы клиентов
        </h2>
        <div className="min-h-[140px] flex items-center justify-center text-center px-4">
          {testimonialsData.map((item, index) => (
            <blockquote
              key={index}
              className={`absolute w-full transition-opacity duration-1000 ${
                index === activeTestimonial ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <p className="italic text-lg mb-4">"{item.text}"</p>
              <footer className="font-semibold">— {item.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="max-w-4xl mx-auto bg-[#E6CFA9] rounded-lg p-12 text-center shadow-inner">
        <h3 className="text-3xl font-bold mb-4">Готовы начать тренировку?</h3>
        <p className="mb-6 text-lg">
          Присоединяйтесь к нам сегодня и получите первый урок бесплатно!
        </p>
        <Link
          href="/register"
          className="inline-block bg-[#9A3F3F] text-[#FBF9D1] px-10 py-4 rounded-md font-semibold shadow-md hover:bg-[#C1856D] transition-colors duration-300"
        >
          Зарегистрироваться
        </Link>
      </section>
    </main>
  );
};

export default Main;
