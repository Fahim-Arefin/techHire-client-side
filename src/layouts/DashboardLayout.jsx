import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { ToastContainer } from "react-toastify";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <div className="">
        <SideBar />
      </div>
      <div className="grow md:p-12">
        <Outlet />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          display: "inline-block",
          width: "auto",
        }}
      />
    </div>
  );
}

export default DashboardLayout;
