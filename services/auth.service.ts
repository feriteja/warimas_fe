import { graphqlFetch } from "@/lib/graphql/fetcher";
import {
  LOGIN_MUTATION,
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
