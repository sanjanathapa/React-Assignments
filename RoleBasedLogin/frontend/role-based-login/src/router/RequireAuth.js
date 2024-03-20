
import { Navigate, useLocation } from "react-router-dom";
import { RoleBasedLoginCurrentUser } from "../utils/validations";
export const RequireAuth = ( { children } ) => {
  const { localStorage } = RoleBasedLoginCurrentUser();
  const location = useLocation();
  console.log("current location in router RequireAuth file-----", location)

  if ( !localStorage ) {
    return <Navigate to = "/app/login" state={{from: location}} replace />
  }
  else {
    return children
  }
};

// this component( RequireAuth ) is used to check if the user is authenticated.If not, it redirects the user to
// the login page( "/app/login" ).Otherwise, it allows rendering its children components