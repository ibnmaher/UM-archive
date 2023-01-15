import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export const UnProtecetedRoute = ({
  children,
  auth,
}: {
  children: JSX.Element;
  auth: any;
}) => {
  let location = useLocation();
  console.log("auth", auth);
  if (auth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
