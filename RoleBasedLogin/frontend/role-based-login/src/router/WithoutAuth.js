import { Navigate } from "react-router-dom";
import { RoleBasedLoginCurrentUser } from "../utils/validations";

export const WithoutAuth = ({ children }) => {
  const { sessionToken } = RoleBasedLoginCurrentUser()

  if (sessionToken) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
