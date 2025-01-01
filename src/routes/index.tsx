import LoginPage from "@/auth/login/page";
import Layout from "@/layout/page";
import EmployeesPage from "@/pages/employees/page";
import ReceiptsPage from "@/pages/receipts/page";
import { Routes as RoutesDom, Route, Navigate } from "react-router";
import { PrivateRoute } from "./PrivateRoute";

const Routes = () => {
  return (
    <RoutesDom>
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="receipts" element={<ReceiptsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/employees" />} />
    </RoutesDom>
  );
};

export default Routes;
