import { graphqlFetch } from "@/lib/graphql/fetcher";
import { GET_PACKAGES } from "@/lib/graphql/query/packages.query";
import { InputPackages, PackagesData } from "@/types/package";

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
