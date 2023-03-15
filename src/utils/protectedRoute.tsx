import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { AUTH } from "types";

export const ProtectedRoute = ({
  children,
  auth,
}: {
  children: JSX.Element;
  auth: AUTH;
}) => {
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
