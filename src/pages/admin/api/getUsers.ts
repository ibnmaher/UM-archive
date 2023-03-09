import { useHttp } from "common/hooks/useHttp";

export const useGetUsers = (query? : any, headers?:any) => {
    const { response, sendRequest, error, loading } = useHttp(query,headers);
    const getUsers = () => {
    
        sendRequest({
        url: 'admin/get-users',
        method: 'Get',
    })}
    return {response,getUsers,loading,error}
}

