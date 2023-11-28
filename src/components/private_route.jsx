import { Navigate, Route } from "react-router-dom";
import isAuthenticated from "../utils/auth_check";

function PrivateRoute({ element: Element, ...rest }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/login" replace />}
    />
  );
}

export default PrivateRoute;
