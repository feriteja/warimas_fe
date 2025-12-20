export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  console.log("url", process.env.NEXT_PUBLIC_GRAPHQL_URL);

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // important for GraphQL mutations
  });

  const json = await res.json();

  if (json.errors?.length) {
    console.error("GraphQL Error:", json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}
