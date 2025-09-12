"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function ContactsPage() {
  return (
    <>
    <Header />
    <main className="min-h-screen bg-[#FBF9D1] text-[#9A3F3F] px-8 py-12 max-w-4xl mx-auto">
      <h1 className="text-5xl font-extrabold mb-8 border-b-4 border-[#9A3F3F] pb-3 inline-block">
        Контакты
      </h1>

      <section className="space-y-8 text-lg leading-relaxed">
        <p>
          Мы будем рады видеть вас в нашей студии! Свяжитесь с нами любым удобным способом:
        </p>

        <ul className="list-disc list-inside space-y-4">
          <li>
            <strong>Адрес:</strong> ул. Спортивная, Москва, Россия
          </li>
          <li>
            <strong>Телефон:</strong>{" "}
            <a href="tel:+74951234567" className="text-[#C1856D] hover:underline">
              +7 (495) 123-45-67
            </a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@fitnessstudio.ru" className="text-[#C1856D] hover:underline">
              info@fitnessstudio.ru
            </a>
          </li>
          <li>
            <strong>График работы:</strong> Пн–Пт: 7:00–22:00, Сб–Вс: 9:00–20:00
          </li>
        </ul>

        <div className="mt-12">
          <h2 className="text-3xl font-semibold mb-4">Мы в соцсетях</h2>
          <div className="flex gap-6 text-[#9A3F3F]">
            <a
              href="https://www.instagram.com/fitnessstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C1856D] transition-colors duration-300"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://t.me/fitnessstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C1856D] transition-colors duration-300"
              aria-label="Telegram"
            >
              Telegram
            </a>
          </div>
        </div>
      </section>
    </main>
    <Footer></Footer>
    </>
  );
}
