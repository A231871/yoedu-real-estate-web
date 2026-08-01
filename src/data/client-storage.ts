import type { User } from "@/context/auth/AuthContext";

const TOKEN_KEY = 'yoedu_access_token';
const USER_KEY = 'yoedu_user';


export function setAccessToken(accessToken: string) {
  localStorage.setItem(TOKEN_KEY, accessToken);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function setUser(userId: string, email: string) {
  localStorage.setItem(USER_KEY, JSON.stringify({
    userId: userId,
    email: email
  }));
}

export function getUser(): User | null {
  const storedUser = localStorage.getItem(USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
}

export function removeUser() {
  localStorage.removeItem(USER_KEY);
}
