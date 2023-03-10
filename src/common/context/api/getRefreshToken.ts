import axios from 'axios';
export const getRefreshToken = async (token: any) => {
  console.log('dwdw',token)
  const instance = axios.create({
    baseURL: `${process.env.REACT_APP_URL}`,

    headers: { Authorization: 'Bearer ' + token },
  });

  try {
    const res = await instance.get('refresh');

    return res.data;
  } catch (err) {
    console.log(err);
  }
};