import { useHttp } from "common/hooks/useHttp";

export const useAddActivity = (query? : any) => {
    const { response, sendRequest, error, loading } = useHttp(query);
    const addActivity = (payload: any) => {
        console.log(payload)
        sendRequest({
        url: 'admin/add-activity',
        method: 'POST',
        data: payload
    })}
    return {response,addActivity,loading,error}
}

