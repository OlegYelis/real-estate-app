import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const RequireAuth = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
