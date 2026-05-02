import { api } from "../api";
import { LoginPayload, LoginResponse } from "./types";

export const loginRequest = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  return api.post("/login/acessar", payload);
};
