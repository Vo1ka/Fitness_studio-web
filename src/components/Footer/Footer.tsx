const Footer = () => {
  return (
    <footer className="bg-[#9A3F3F] text-[#FBF9D1] py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Логотип или название */}
        <div className="text-xl font-bold select-none cursor-default">
          Fitness Studio
        </div>

        {/* Навигация */}
        <nav>
          <ul className="flex flex-wrap justify-center gap-6 text-[#E6CFA9] font-semibold">
            <li>
              <a href="/" className="hover:text-[#FBF9D1] transition-colors duration-300">
                Главная
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#FBF9D1] transition-colors duration-300">
                О нас
              </a>
            </li>
            <li>
              <a href="/contacts" className="hover:text-[#FBF9D1] transition-colors duration-300">
                Контакты
              </a>
            </li>
            <li>
              <a href="/schedule" className="hover:text-[#FBF9D1] transition-colors duration-300">
                Расписания
              </a>
            </li>
            <li>
              <a href="/subscriptions" className="hover:text-[#FBF9D1] transition-colors duration-300">
                Абонементы
              </a>
            </li>
          </ul>
        </nav>

        {/* Копирайт */}
        <div className="text-sm text-[#E6CFA9] select-none">
          &copy; {new Date().getFullYear()} Fitness Studio. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
