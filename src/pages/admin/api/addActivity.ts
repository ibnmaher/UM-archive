import { useHttp } from "common/hooks/useHttp";

export const useAddActivity = (query? : any) => {
    const { response, sendRequest, error, loading } = useHttp(query, {"Content-Type": "application/x-www-form-urlencoded"});
    const addActivity = async (payload: any) => {
      
        sendRequest({
        url: 'admin/add-activity',
        method: 'POST',
        data: payload
      
    })}
    return {response,addActivity,loading,error}
}

