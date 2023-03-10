import { useHttp } from "common/hooks/useHttp";

export const useUpdateUser = (query? : any,headers?: any) => {
    const { response, sendRequest, error, loading } = useHttp(query,headers);
    const updateUser = (payload: any) => {
        console.log(payload)
        sendRequest({
        url: 'admin/update-user',
        method: 'PUT',
        data: payload
    })}
    return {response,updateUser,loading,error}
}

