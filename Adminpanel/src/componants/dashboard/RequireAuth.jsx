
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  let authed = localStorage.getItem("userInfo");

  return authed ? children : <Navigate to="/admin" replace />;
}

export default RequireAuth;