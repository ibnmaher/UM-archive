import { useHttp } from "common/hooks/useHttp";

export const useDeleteUser = (query? : any, headers?:any) => {
    const { response, sendRequest, error, loading } = useHttp(query, {...headers,"Content-Type": "application/x-www-form-urlencoded"});
    const deleteUser = async (payload: any) => {
      
        sendRequest({
        url: 'admin/delete-user',
        method: 'DELETE',
        data: payload
      
    })}
    return {response,deleteUser,loading,error}
}

