import { useHttp } from "common/hooks/useHttp";

export const useResetPassword = (query?: any) => {
  const { response, sendRequest, error, loading } = useHttp(query);
  const resetPassword = (payload: any) => {
    sendRequest({
      url: "login/reset-password",
      method: "PUT",
      data: payload,
    });
  };
  return { response, resetPassword, error, loading };
};
