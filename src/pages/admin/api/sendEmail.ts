import { useHttp } from "common/hooks/useHttp";

export const useSendEmail = (query? : any, headers?:any) => {
    const { response, sendRequest, error, loading } = useHttp(query, {...headers,"Content-Type": "application/x-www-form-urlencoded"});
    const sendEmail = async (payload: any) => {
      
        sendRequest({
        url: 'admin/send-email',
        method: 'POST',
        data: payload
      
    })}
    return {response,sendEmail,loading,error}
}

