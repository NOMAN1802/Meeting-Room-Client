import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { logout } from "../redux/features/authSlice";


export type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);

  let user;

  if (token) {
    user = verifyToken(token);
  }
  

  const dispatch = useAppDispatch();

  
  if (role !== undefined && role !== user?.role) {
    dispatch(logout());

    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;