import { useHttp } from "common/hooks/useHttp";

export const useGetNames = (query? : any) => {
    const { response, sendRequest, error, loading } = useHttp(query);
    const getNames = () => {
    
        sendRequest({
        url: 'admin/get-names',
        method: 'Get',
    })}
    return {response,getNames,loading,error}
}

