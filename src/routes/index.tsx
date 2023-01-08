import { Home } from "pages/home/home";
import { Login } from "pages/login/login";
import { Signup } from "pages/signup/signup";
import React from "react";
import { Routes, Route } from "react-router-dom";

export const Index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
