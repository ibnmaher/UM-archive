import { useHttp } from "common/hooks/useHttp";

export const useAddUser = (query? : any,headers?: any) => {
    const { response, sendRequest, error, loading } = useHttp(query,headers);
    const addUser = (payload: any) => {
        console.log(payload)
        sendRequest({
        url: 'admin/add-user',
        method: 'POST',
        data: payload
    })}
    return {response,addUser,loading,error}
}

