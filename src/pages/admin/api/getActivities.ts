import { useHttp } from "common/hooks/useHttp";

export const useGetActivities = (query? : any,headers?:any) => {

    const { response, sendRequest, error, loading } = useHttp(query,headers);
    const getActivities = () => {
     
        sendRequest({
        url: 'admin/get-activities',
        method: 'GET',
    })}
    return {response,getActivities,loading,error}
}

