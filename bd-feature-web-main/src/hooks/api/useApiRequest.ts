import { useCallback, useState } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method: RequestMethod;
  headers?: HeadersInit;
  body?: BodyInit | null;
  cache?: RequestCache | undefined;
}

const useApiRequest = <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const sendRequest = useCallback(
    async (url: string, options: RequestOptions) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, {
          method: options.method,
          headers: options.headers,
          body: options.body,
          cache: options.cache,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "something went wrong");
        }

        setData(result);
        return result;
      } catch (error) {
        setError(error as Error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, data, error, sendRequest };
};

export default useApiRequest;
