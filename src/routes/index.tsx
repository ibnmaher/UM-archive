import { Admin } from "pages/admin/admin";

import { Home } from "pages/home/home";
import { Login } from "pages/login/login";
import { ResendCode } from "pages/login/sub/resendCode";
import { Reset } from "pages/login/sub/reset";
import { ResetPassword } from "pages/login/sub/resetPassword";
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
      <Route
        path="/reset"
        element={
          <UnProtecetedRoute auth={auth}>
            <Reset />
          </UnProtecetedRoute>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <UnProtecetedRoute auth={auth}>
            <ResetPassword />
          </UnProtecetedRoute>
        }
      />
      <Route
        path="/resend-code"
        element={
          <UnProtecetedRoute auth={auth}>
            <ResendCode />
          </UnProtecetedRoute>
        }
      />
    </Routes>
  );
};
