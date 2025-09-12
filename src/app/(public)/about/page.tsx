"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function AboutPage() {
  return (
    <>
    <Header />
    <main className="min-h-screen bg-[#FBF9D1] text-[#9A3F3F] px-8 py-12 max-w-5xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-8 border-b-4 border-[#9A3F3F] pb-3 inline-block">
        О нас
      </h1>

      <section className="space-y-8 text-lg leading-relaxed">
        <p>
          Fitness Studio — это место, где каждый найдёт подходящие занятия для себя.
          Мы предлагаем широкий спектр тренировок: от йоги до высокоинтенсивных интервальных тренировок.
        </p>

        <p>
          Наши тренеры — профессионалы с опытом и вниманием к каждому клиенту.
          Мы создаём комфортную и поддерживающую атмосферу, чтобы вы могли достигать своих целей с удовольствием.
        </p>

        <p>
          В нашей студии вы найдёте:
        </p>

        <ul className="list-disc list-inside space-y-2">
          <li>Современное оборудование и просторные залы</li>
          <li>Индивидуальный подход и персональные тренировки</li>
          <li>Гибкое расписание и разнообразие программ</li>
          <li>Групповые занятия для всех уровней подготовки</li>
          <li>Дружелюбная команда и поддержка на каждом шагу</li>
        </ul>

        <p>
          Присоединяйтесь к Fitness Studio и начните свой путь к здоровью и гармонии уже сегодня!
        </p>
      </section>
    </main>
    <Footer></Footer>
    </>
  );
}
