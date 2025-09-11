let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { auth?: boolean; refresh?: boolean } = {}
): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (options.auth && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: options.refresh ? "include" : options.credentials,
  });

  if (res.status === 401 && !options.refresh) {
    // Попытка обновить токен
    const refreshed = await tryRefresh();
    if (refreshed) {
      // Повторяем исходный запрос с новым токеном
      return apiFetch<T>(path, { ...options, auth: options.auth });
    }
  }

  if (!res.ok) {
    let payload: any;
    try {
      payload = await res.json();
    } catch {
      throw new Error(res.statusText);
    }
    const msg = payload?.error?.message || res.statusText;
    const code = payload?.error?.code;
    const e = new Error(code ? `${code}: ${msg}` : msg);
    // @ts-ignore
    e.code = code;
    throw e;
  }

  return res.json() as Promise<T>;
}

async function tryRefresh(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // важно для cookie refresh_token
      body: JSON.stringify({}), // если бэк читает refresh из cookie
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data?.accessToken) setAccessToken(data.accessToken);
    return true;
  } catch {
    return false;
  }
}
