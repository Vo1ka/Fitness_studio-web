"use client";

import { useClassTypes, useCoaches, useSessions } from "@/app/lib/api/endpoints";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Link from "next/link";
import { useState } from "react";

export default function SessionsPage() {
  const [filters, setFilters] = useState<{
    date?: string;
    classTypeId?: string;
    coachId?: string;
    page: number;
  }>({ page: 1 });

  const classTypesQuery = useClassTypes();
  const coachesQuery = useCoaches();
  const sessionsQuery = useSessions(filters);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, date: e.target.value, page: 1 }));
  };

  const handleClassTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      classTypeId: e.target.value || undefined,
      page: 1,
    }));
  };

  const handleCoachChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      coachId: e.target.value || undefined,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
    <main className="min-h-screen bg-[#FBF9D1] text-[#9A3F3F] px-8 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 border-b-4 border-[#9A3F3F] pb-3 inline-block">
        Расписание занятий
      </h1>

      {/* Фильтры */}
      <section className="mb-8 flex flex-wrap gap-4 items-center">
        <input
          type="date"
          value={filters.date || ""}
          onChange={handleDateChange}
          className="border border-[#C1856D] rounded px-3 py-2"
        />

        <select
          value={filters.classTypeId || ""}
          onChange={handleClassTypeChange}
          className="border border-[#C1856D] rounded px-3 py-2"
        >
          <option value="">Все типы занятий</option>
          {classTypesQuery.data?.map((ct) => (
            <option key={ct.id} value={ct.id}>
              {ct.title}
            </option>
          ))}
        </select>

        <select
          value={filters.coachId || ""}
          onChange={handleCoachChange}
          className="border border-[#C1856D] rounded px-3 py-2"
        >
          <option value="">Все тренеры</option>
          {coachesQuery.data?.map((coach) => (
            <option key={coach.id} value={coach.id}>
              {coach.name}
            </option>
          ))}
        </select>
      </section>

      {/* Сессии */}
      <section>
        {sessionsQuery.isLoading && <p>Загрузка...</p>}
        {sessionsQuery.isError && (
          <p className="text-red-600">Ошибка загрузки расписания</p>
        )}

        {!sessionsQuery.isLoading && sessionsQuery.data?.items.length === 0 && (
          <p>Занятий не найдено.</p>
        )}

        <ul className="space-y-6">
          {sessionsQuery.data?.items.map((session) => (
            <li
              key={session.id}
              className="border border-[#C1856D] rounded p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="text-2xl font-semibold">{session.classType.title}</h3>
                <p>
                  Тренер: <span className="font-medium">{session.coach.name}</span>
                </p>
                <p>
                  Дата и время:{" "}
                  {new Date(session.startsAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p>Продолжительность: {session.classType.durationMinutes} мин</p>
              </div>
              <div className="text-right">
                <p>Мест осталось: {session.capacity}</p>
                <p className="font-semibold">Цена: £{session.price.toFixed(2)}</p>
                <Link
                  href={`/sessions/${session.id}`}
                  className="mt-2 inline-block bg-[#9A3F3F] text-[#FBF9D1] px-4 py-2 rounded hover:bg-[#C1856D] transition-colors"
                >
                  Подробнее
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* Пагинация */}
        {sessionsQuery.data && sessionsQuery.data.total > sessionsQuery.data.limit && (
          <nav className="mt-8 flex justify-center space-x-3">
            {Array.from(
              { length: Math.ceil(sessionsQuery.data.total / sessionsQuery.data.limit) },
              (_, i) => i + 1
            ).map((page) => (
              <button
                key={page}
                className={`px-3 py-1 rounded ${
                  page === sessionsQuery.data.page
                    ? "bg-[#9A3F3F] text-[#FBF9D1]"
                    : "bg-[#E6CFA9] text-[#9A3F3F] hover:bg-[#C1856D] hover:text-[#FBF9D1]"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </nav>
        )}
      </section>
    </main>
    </>
  );
}
