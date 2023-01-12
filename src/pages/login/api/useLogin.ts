import { useHttp } from "common/hooks/useHttp";

export const useLogine = (query? : any) => {
    const { response, sendRequest, loading } = useHttp(query);
    const login = (payload: any) => sendRequest({
        url: 'login/',
        method: 'POST'
    })
    return {response,login,loading}
}

