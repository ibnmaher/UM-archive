import React from "react";

import "./App.css";
import { Index } from "routes";
import { Navbar } from "common/components/nav/navbar";
import { useSelect } from "@mui/base";
import authSlice from "common/context/slices/authSlice";
import { useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state: any) => state.authSlice);
  return (
    <div className="bg-quan min-h-screen relative">
      <Navbar auth={auth} />
      <Index auth={auth} />
    </div>
  );
}

export default App;
