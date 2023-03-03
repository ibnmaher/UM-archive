import { useHttp } from "common/hooks/useHttp";

export const useDeleteActivity = (query? : any, headers?:any) => {
    const { response, sendRequest, error, loading } = useHttp(query, {...headers,"Content-Type": "application/x-www-form-urlencoded"});
    const deleteActivity = async (payload: any) => {
      
        sendRequest({
        url: 'admin/delete-activity',
        method: 'DELETE',
        data: payload
      
    })}
    return {response,deleteActivity,loading,error}
}

