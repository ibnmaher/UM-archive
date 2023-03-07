import { useHttp } from "common/hooks/useHttp";

export const useUpdateActivity = (query? : any, headers?:any) => {
    const { response, sendRequest, error, loading } = useHttp(query, {...headers,"Content-Type": "application/x-www-form-urlencoded"});
    const updateActivity = async (payload: any) => {
      
        sendRequest({
        url: 'admin/update-activity',
        method: 'PUT',
        data: payload
      
    })}
    return {response,updateActivity,loading,error}
}

