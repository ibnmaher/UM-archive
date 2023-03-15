import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


import { Action } from 'redux';
import { getRefreshToken } from 'common/context/api/getRefreshToken';
import { AUTH } from 'types';

interface IAction<T> extends Action<string> {
  type: string;
  payload: T;
  error?: boolean;
  meta?: any;
}


// @ts-ignore
let oldToken: string = localStorage.getItem('token')

interface IState {
  auth: AUTH | boolean | string;
  isLoading: boolean;
  hasError: boolean;
}

const initialState: IState = {
  auth: false,
  isLoading: true,
  hasError: false,
};

export const getAuth = createAsyncThunk('auth/getAuth', async (arg, thunkAPI) => {
  if (oldToken) {
    const info = await getRefreshToken(oldToken);
    return info;
  }
});

export const setAuth = (auth: AUTH | boolean) => {
  return {
    type: 'auth/setAuth',
    payload: auth,
  };
};
export const removeAuth = () => {
  return {
    type: 'auth/removeAuth',
  };
};
const options = {
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state: IState, action: any) => {
      const newState = { ...state };
      newState.auth = action.payload;
      return newState;
    },
    removeAuth: (state: IState, action: any) => {
      return { ...state, auth: false };
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(getAuth.pending, (state: IState, action: IAction<boolean>) => {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    });
    builder.addCase(getAuth.fulfilled, (state: IState, action: IAction<AUTH | boolean>) => {
      const newState = { ...state };

      newState.auth = action.payload;
      newState.isLoading = false;
      return newState;
    });
    builder.addCase(getAuth.rejected, (state: IState, action: IAction<boolean>) => {
      removeAuth();
      const newState = { ...state };
      newState.auth = false;
      newState.isLoading = false;
      return newState;
    });
  },
};
const authSlice = createSlice(options);

export default authSlice.reducer;