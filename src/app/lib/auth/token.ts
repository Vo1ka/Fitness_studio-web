const ACCESS_TOKEN_KEY = 'accessToken';

export const setAccessToken = (token: string | null): void =>{
    try{
        if(token === null){
            sessionStorage.removeItem(ACCESS_TOKEN_KEY)
        } else{
            sessionStorage.setItem(ACCESS_TOKEN_KEY,token);
        }
    } catch (e){
        console.warn('Ошибка при записи токена: ', e)
    }

}

export function getAccessToken(): string | null {
  try {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.warn("Ошибка при получении токена", error);
    return null;
  }
}
