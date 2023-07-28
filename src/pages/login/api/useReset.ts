import { useHttp } from "common/hooks/useHttp";

export const useReset = (query?: any) => {
  const { response, sendRequest, error, loading } = useHttp(query);
  const reset = (payload: any) => {
    sendRequest({
      url: "login/reset",
      method: "POST",
      data: payload,
    });
  };
  return { response, reset, error, loading };
};
