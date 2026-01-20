import { graphqlFetch } from "@/lib/graphql/fetcher";
import { UPDATE_PROFILE } from "@/lib/graphql/mutation/user.mutation";
import { GET_PROFILE } from "@/lib/graphql/query/user.query";
import { UpdateProfileInput, User } from "@/types";

export async function getProfile({
  cookieHeader,
}: {
  cookieHeader?: string;
} = {}): Promise<User> {
  return graphqlFetch<{ myProfile: User }>(GET_PROFILE, {
    cache: "no-store",
    cookieHeader,
  }).then((res) => res.myProfile);
}

export async function updateProfile(input: UpdateProfileInput): Promise<User> {
  return graphqlFetch<{ updateProfile: User }, { input: UpdateProfileInput }>(
    UPDATE_PROFILE,
    {
      variables: { input },
      cache: "no-store",
    },
  ).then((res) => res.updateProfile);
}
