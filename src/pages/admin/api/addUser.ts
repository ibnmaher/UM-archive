import { useHttp } from "common/hooks/useHttp";

export const useAddtUser = (query? : any) => {
    const { response, sendRequest, loading } = useHttp(query);
    const addUser = (payload: any) => {
        console.log(payload)
        sendRequest({
        url: 'admin/add-user',
        method: 'POST',
        data: payload
    })}
    return {response,addUser,loading}
}

