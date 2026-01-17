import { graphqlFetch } from "@/lib/graphql/fetcher";
import { CREATE_ADDRESS } from "@/lib/graphql/mutation/address.mutation";
import { GET_ADDRESSES } from "@/lib/graphql/query/address.query";
import { AddressType, createAddressInput, CreateAddressPayload } from "@/types";

export async function getAddressList({
  cookieHeader,
}: {
  cookieHeader?: string;
}): Promise<AddressType[]> {
  return graphqlFetch<{ addresses: AddressType[] }>(GET_ADDRESSES, {
    cache: "no-store",
    cookieHeader: cookieHeader,
  }).then((res) => res.addresses);
}

export async function createAddress({
  cookieHeader,
  input,
}: {
  cookieHeader?: string;
  input: createAddressInput;
}) {
  return graphqlFetch<{}, { createAddressInput: createAddressInput }>(
    CREATE_ADDRESS,
    {
      cache: "no-store",
      variables: {
        createAddressInput: {
          address: input.address,
          setAsDefault: input.setAsDefault,
        },
      },
      cookieHeader: cookieHeader,
    },
  );
}
