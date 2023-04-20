import { useHttp } from "common/hooks/useHttp";

export const useGetUserActivites = (query? : any, headers?:any) => {
    const { response, sendRequest, error, loading } = useHttp(query,headers);
    const getUserActivities = () => {
    
        sendRequest({
        url: 'admin/get-user-activities',
        method: 'Get',
    })}
    return {response,getUserActivities,loading,error}
}

