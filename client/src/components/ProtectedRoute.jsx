import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes({children, role}) {
  const { user } = useAuth();

  // if user is not logined in 
  if(!user) {
    return <Navigate to="/login" />
  }

  // if role restriction exists
  if(role && user.role !== role) {
    return <Navigate to="/login" />
  }
  return children;

}

export default ProtectedRoutes;