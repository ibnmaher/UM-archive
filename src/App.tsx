import React, { useEffect } from "react";

import "./App.css";
import { Index } from "routes";
import { Navbar } from "common/components/nav/navbar";
import { useSelect } from "@mui/base";
import authSlice, { getAuth } from "common/context/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "common/context/store";
import { MoonLoader } from "react-spinners";
let timeOut: ReturnType<typeof setTimeout>;
function App() {
  const { auth, isLoading } = useSelector((state: any) => state.authSlice);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAuth());
  }, []);
  useEffect(() => {
    clearInterval(timeOut);
    if (auth) {
      timeOut = setInterval(() => {
        return dispatch(getAuth());
      }, 7200000);
    }
  }, [auth]);
  return (
    <div className="bg-quan min-h-screen relative">
      {!isLoading ? (
        <>
          <Navbar auth={auth} />
          <Index auth={auth} />
        </>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <MoonLoader color="#36d7b7" />
        </div>
      )}
    </div>
  );
}

export default App;
