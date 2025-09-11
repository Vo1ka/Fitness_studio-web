import Link from "next/link"


const NavBar = () =>{


    return(

    <nav>
      <ul className="flex gap-8 text-[#E6CFA9] font-semibold">
        <li>
          <Link
            href="/"
            className="hover:text-[#FBF9D1] transition-colors duration-300"
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-[#FBF9D1] transition-colors duration-300"
          >
            О нас
          </Link>
        </li>
        <li>
          <Link
            href="/contacts"
            className="hover:text-[#FBF9D1] transition-colors duration-300"
          >
            Контакты
          </Link>
        </li>
        <li>
          <Link
            href="/schedule"
            className="hover:text-[#FBF9D1] transition-colors duration-300"
          >
            Расписания
          </Link>
        </li>
        <li>
          <Link
            href="/subscriptions"
            className="hover:text-[#FBF9D1] transition-colors duration-300"
          >
            Абонементы
          </Link>
        </li>
      </ul>
    </nav>

    )
}

export default NavBar;