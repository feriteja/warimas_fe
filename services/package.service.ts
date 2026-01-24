import { graphqlFetch } from "@/lib/graphql/fetcher";
import { ADD_PACKAGE } from "@/lib/graphql/mutation/package.mutation";
import { GET_PACKAGES } from "@/lib/graphql/query/packages.query";
import { InputAddPackages, InputPackages, PackagesData } from "@/types/package";

export async function getPackages(
  input: InputPackages,
  cookieHeader?: string,
): Promise<PackagesData> {
  return graphqlFetch<{ packages: PackagesData }, InputPackages>(GET_PACKAGES, {
    variables: input,
    cache: "no-store",
    cookieHeader,
  }).then((res) => res.packages);
}

export async function addPackage(
  input: InputAddPackages,
  cookieHeader?: string,
): Promise<{ id: string; name: string }> {
  return graphqlFetch<
    { addPackage: { id: string; name: string } },
    { input: InputAddPackages }
  >(ADD_PACKAGE, {
    variables: { input },
    cache: "no-store",
    cookieHeader,
  }).then((res) => res.addPackage);
}
