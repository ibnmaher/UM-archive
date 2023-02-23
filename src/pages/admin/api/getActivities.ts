import { useHttp } from "common/hooks/useHttp";

export const useGetActivities = (query? : any) => {
    const { response, sendRequest, error, loading } = useHttp(query);
    const getActivities = () => {
     
        sendRequest({
        url: 'admin/get-activities',
        method: 'GET',
    })}
    return {response,getActivities,loading,error}
}

