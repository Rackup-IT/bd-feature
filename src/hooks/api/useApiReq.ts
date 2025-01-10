import { useState } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions {
  method: RequestMethod;
  headers?: HeadersInit;
  body?: BodyInit | null;
  cache?: RequestCache | undefined;
}

export const LoadingMode = {
  Idle: "Idle",
  OnGoing: "OnGoing",
  Done: "Done",
} as const;

interface ReqResult<T> {
  response: T | null;
  error: Error | null;
  loading: keyof typeof LoadingMode;
  sendRequest: (url: string, options: RequestOptions) => Promise<T | void>;
  setLoadingMode: (mode: keyof typeof LoadingMode) => void;
  setErrorMessage: (error: Error | null) => void;
}

const useApiReq = <T>(): ReqResult<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<keyof typeof LoadingMode>(
    LoadingMode.Idle
  );

  const sendRequest = async (
    url: string,
    options: RequestOptions
  ): Promise<T | void> => {
    setLoading(LoadingMode.OnGoing);
    setError(null);
    try {
      const res = await fetch(url, options);
      const resResult = await res.json();

      if (!res.ok) {
        console.log(resResult);
        throw new Error(resResult.message);
      }
      setResponse(resResult);
      return resResult as T;
    } catch (error) {
      setError(error as Error);
      return;
    } finally {
      setLoading(LoadingMode.Done);
    }
  };

  const setLoadingMode = (mode: keyof typeof LoadingMode) => {
    setLoading(mode);
  };

  const setErrorMessage = (error: Error | null) => {
    setError(error);
  };

  return {
    response,
    error,
    loading,
    sendRequest,
    setLoadingMode,
    setErrorMessage,
  };
};

export default useApiReq;
