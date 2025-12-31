// graphqlFetch.ts

export type GraphQLError = {
  message: string;
  extensions?: Record<string, unknown>;
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

export type GraphqlFetchOptions<TVariables> = {
  variables?: TVariables;
  headers?: HeadersInit;
  cookieHeader?: string;
  /**
   * Use "no-store" for mutations or user-specific data
   * Use "force-cache" for public queries
   */
  cache?: RequestCache;
  /**
   * Abort request after N ms (default: 10s)
   */
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT = 10_000;

function getGraphqlUrl(): string {
  const url = process.env.NEXT_PUBLIC_GRAPHQL_URL;
  if (!url) {
    throw new Error("NEXT_PUBLIC_GRAPHQL_URL is not defined");
  }
  return url;
}

export async function graphqlFetch<TData, TVariables = Record<string, unknown>>(
  query: string,
  options: GraphqlFetchOptions<TVariables> = {}
): Promise<TData> {
  const {
    variables,
    headers,
    cache = "no-store",
    timeoutMs = DEFAULT_TIMEOUT,
    cookieHeader,
  } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;

  try {
    res = await fetch(getGraphqlUrl(), {
      method: "POST",
      credentials: "include",
      signal: controller.signal,
      cache,
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader && { Cookie: cookieHeader }),
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new Error("GraphQL request timed out");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Network error ${res.status}: ${text}`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    console.error("[GraphQL errors]", json.errors);
    throw new Error(json.errors[0].message);
  }

  if (!json.data) {
    throw new Error("GraphQL response returned no data");
  }

  return json.data;
}
