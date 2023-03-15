import { Admin } from "pages/admin/admin";
import { Home } from "pages/home/home";
import { Login } from "pages/login/login";
import { Profile } from "pages/profile/profile";
import { Signup } from "pages/signup/signup";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AUTH } from "types";
import { ProtectedRoute } from "utils/protectedRoute";
import { UnProtecetedRoute } from "utils/unProtectedRoute";

export const Index = ({ auth }: { auth: AUTH }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="admin"
        element={
          <ProtectedRoute auth={auth}>
            <Admin auth={auth} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <UnProtecetedRoute auth={auth}>
            <Login />
          </UnProtecetedRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <UnProtecetedRoute auth={auth}>
            <Signup />
          </UnProtecetedRoute>
        }
      />
    </Routes>
  );
};
