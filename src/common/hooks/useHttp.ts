import { useState } from 'react';
import axios from 'axios';


export const useHttp = (query?: any, headers?: any) => {

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const client = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`,
    headers: {
    ...headers
    },
    params: query,
  });

  const sendRequest: (params: any) => Promise<any> = async ({ url, method, data }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await client.request({ url, method, data });
      setResponse(res.data);
    } catch (err:any) {
      console.log(err.response)
     setError(err.response)
    }
    setLoading(false);
  };
  return { loading, response, error,sendRequest };
};