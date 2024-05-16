import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="">
        <SideBar />
      </div>
      <div className="grow md:p-12">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
