import { authenticationApi } from "@/api/client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/api/openapi-generated";
import {
  setAccessToken,
  removeAccessToken,
  setUser,
  removeUser
} from "@/lib/data/client-storage";

async function setAuthSession(authData: AuthResponse) {
  if (!authData.accessToken) {
    throw new Error("Access token not found");
  }
  setAccessToken(authData.accessToken);

  if (!authData.email || !authData.userId) {
    throw new Error("No user information found");
  }
  setUser(authData.userId, authData.email);
}

export async function login(request: LoginRequest): Promise<AuthResponse> {
  const { data: response } = await authenticationApi.login({ loginRequest: request });

  if (!response.data) {
    throw new Error(response.message);
  }

  setAuthSession(response.data);

  return response.data;
}

export async function register(registerRequest: RegisterRequest): Promise<string> {
  const { data: response } = await authenticationApi.register({ registerRequest });
  return response.message;
}

export async function verify(token: string) {
  const { data: response } = await authenticationApi.verify({ token });

  if (!response.data) {
    throw new Error(response.message);
  }

  setAuthSession(response.data);
}

export async function logout() {
  // Call backend to revoke the current refresh token
  await authenticationApi.logout();

  // Remove the access token and user info
  removeAccessToken();
  removeUser();
}
