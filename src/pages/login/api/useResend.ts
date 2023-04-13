import { useHttp } from "common/hooks/useHttp";

export const useResend = (query? : any) => {
    const { response, sendRequest, error, loading } = useHttp(query);
    const resend = (payload: any) => {
      
        sendRequest({
        url: 'signup/resend-code',
        method: 'POST',
        data: payload
    })}
    return {response,resend,error,loading}
}

