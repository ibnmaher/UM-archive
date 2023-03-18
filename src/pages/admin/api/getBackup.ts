import { useHttp } from "common/hooks/useHttp";

export const useGetBackup = (query? : any,headers?:any) => {

    const { response, sendRequest, error, loading } = useHttp(query,headers);
    const getBackup = () => {
     
        sendRequest({
        url: 'admin/get-backup',
        method: 'GET',
        response: 'blob', // Important
    })}
    return {response,getBackup,loading,error}
}

