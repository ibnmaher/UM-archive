import { useHttp } from "common/hooks/useHttp";

export const useGetNames = (query? : any, headers?:any) => {
    const { response, sendRequest, error, loading } = useHttp(query,headers);
    const getNames = () => {
    
        sendRequest({
        url: 'admin/get-names',
        method: 'Get',
    })}
    return {response,getNames,loading,error}
}

