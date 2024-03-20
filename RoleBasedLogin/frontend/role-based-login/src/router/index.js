import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { WithoutAuth } from "./WithoutAuth";

import LoginPage from "../../src/pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import routes from "../router/routes";
import UserFormPage from "../pages/UserFormPage";
import { RequireAuth } from "./RequireAuth";
import { RoleBasedLoginCurrentUser } from "../utils/validations";
import { get } from "../utils/lodash";
// import ErrorPage from "pages/ErrorPage";

const MainRoute = () => {
  // Initial page, we can change this based on user role in future
  const { user } = RoleBasedLoginCurrentUser();
  const userRole = get(user, "role", "");
  console.log(userRole, "this is the userRole--------");
  const defaultPath = routes.app.login;

  return (
    <Routes>
       <Route path="/" element={<Navigate to={defaultPath} />} />
      <Route
        path={defaultPath}
        element={
          <WithoutAuth path={defaultPath}>
            <LoginPage />
          </WithoutAuth>
        }
      />
      <Route exact path={routes.app.dashboard} element={<DashboardPage />} />

      <Route exact path={routes.app.userForm} element={<UserFormPage />} />
    </Routes>
  );
};

export default MainRoute;
