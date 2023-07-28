import { useHttp } from "common/hooks/useHttp";

export const useLogin = (query?: any) => {
  const { response, sendRequest, error, loading } = useHttp(query);
  const login = (payload: any) => {
    sendRequest({
      url: "login",
      method: "POST",
      data: payload,
    });
  };
  return { response, login, error, loading };
};
