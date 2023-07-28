import { useHttp } from "common/hooks/useHttp";

export const useSignup = (query?: any) => {
  const { response, sendRequest, error, loading } = useHttp(query);
  const signup = (payload: any) => {
    sendRequest({
      url: "signup",
      method: "POST",
      data: payload,
    });
  };
  return { response, signup, error, loading };
};
