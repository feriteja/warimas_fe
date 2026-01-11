import { graphqlFetch } from "@/lib/graphql/fetcher";
import { GET_ADDRESSES } from "@/lib/graphql/queries";
import { AddressType } from "@/types";

export async function getAddressList({
  cookieHeader,
}: {
  cookieHeader?: string;
}): Promise<AddressType[]> {
  return graphqlFetch<{ addresses: AddressType[] }>(GET_ADDRESSES, {
    cache: "force-cache",
    cookieHeader: cookieHeader,
  }).then((res) => res.addresses);
}
