import { useState } from 'react';
import axios from 'axios';


export const useHttp = (query?: any) => {

  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const client = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`,
    headers: {
    //   Authorization: `Bearer ${auth?.token}`,
    },
    params: query,
  });

  const sendRequest: (params: any) => Promise<any> = async ({ url, method, data }) => {
    setLoading(true);
    try {
      const res = await client.request({ url, method, data });
      setResponse(res.data);
    } catch (err) {
      setResponse(err);
    }
    setLoading(false);
  };
  return { loading, response, sendRequest };
};