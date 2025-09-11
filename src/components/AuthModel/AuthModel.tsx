import Link from "next/link"


const AuthModel = () => {


    return(
    <div>
        <Link
            href="/login"
            className="px-4 py-2 border border-[#E6CFA9] text-[#E6CFA9] rounded-md hover:bg-[#9A3F3F] hover:text-[#FBF9D1] transition-colors duration-300"
        >
            Войти
        </Link>
    </div>

    )
}

export default AuthModel;