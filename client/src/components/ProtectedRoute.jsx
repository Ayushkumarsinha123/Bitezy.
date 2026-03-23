import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes({children, role}) {
  const { user , loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-red-500 font-bold text-xl animate-pulse">
        Loading...
      </div>
    );
  }
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