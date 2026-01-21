import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REGISTER_MUTATION,
} from "@/lib/graphql/mutation/auth.mutation";
import {
  LoginInput,
  LoginResponse,
  RegisterInput,
  RegisterResponse,
} from "@/types/auth";

export async function login(input: LoginInput): Promise<LoginResponse> {
  return graphqlFetch<{ login: LoginResponse }, { input: LoginInput }>(
    LOGIN_MUTATION,
    {
      variables: { input },
      cache: "no-store",
    },
  ).then((res) => res.login);
}

export async function logout(): Promise<boolean> {
  return graphqlFetch<{ logout: boolean }>(LOGOUT_MUTATION, {
    cache: "no-store",
  }).then((res) => res.logout);
}

export async function register(
  input: RegisterInput,
): Promise<RegisterResponse> {
  return graphqlFetch<{ register: RegisterResponse }, { input: RegisterInput }>(
    REGISTER_MUTATION,
    {
      variables: { input },
      cache: "no-store",
    },
  ).then((res) => res.register);
}
