import { useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "./token";
import { useRegister } from "../api/endpoints";


export function useAuth(){
    const [accessToken, setToken] = useState<string | null>(null)
    const registerMutation = useRegister();

    useEffect(()=>{
        const token = getAccessToken();
        setToken(token);
    },[])

    function login(token: string){
        setAccessToken(token)
        setToken(token)
    }

    function logout(){
        setAccessToken(null)
        setToken(null);
    }

    async function register(data: { email: string; password: string; name: string }) {
        try {
            const res = await registerMutation.mutateAsync(data);
            // Если хотите — можно сразу залогинить пользователя, вызвав login с теми же данными
            // Или вернуть результат регистрации для дальнейшей обработки
            return res;
        } catch (error) {
            console.error(error)
            
        }
    }

    return{
        accessToken,
        isAuthed: !!accessToken,
        login,
        logout
    }

}