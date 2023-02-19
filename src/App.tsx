import React, { useEffect } from "react";

import "./App.css";
import { Index } from "routes";
import { Navbar } from "common/components/nav/navbar";
import { useSelect } from "@mui/base";
import authSlice, { getAuth } from "common/context/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "common/context/store";
let timeOut: any;
function App() {
  const { auth, isLoading } = useSelector((state: any) => state.authSlice);
  console.log("dwdw", isLoading);
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
        <>LOADING</>
      )}
    </div>
  );
}

export default App;
