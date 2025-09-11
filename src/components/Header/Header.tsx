import AuthModel from "../AuthModel/AuthModel";
import NavBar from "./NavBar/NavBar";


const Header = () => {


    return(

    <header className="flex items-center justify-between px-10 py-6 bg-[#9A3F3F] border-b border-[#C1856D] shadow-md sticky top-0 z-50">
        <h4 className="text-3xl font-bold text-[#FBF9D1] select-none cursor-default">
            Название
        </h4>
        <NavBar />
        <AuthModel />
    </header>
    )
}

export default Header;