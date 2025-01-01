import { Outlet } from "react-router";
import Sidenav from "./sidenav";

export default function Layout() {
  return (
    <div className="flex">
      <Sidenav />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
