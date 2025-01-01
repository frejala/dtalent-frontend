import LoginPage from "@/auth/login/page";
import Layout from "@/layout/page";
import EmployeesPage from "@/pages/employees/page";
import { Routes as RoutesDom, Route } from "react-router";

const Routes = () => {
  return (
    <RoutesDom>
      <Route element={<Layout />}>
        <Route path="employees" element={<EmployeesPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </RoutesDom>
  );
};

export default Routes;
