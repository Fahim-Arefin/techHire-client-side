import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

function AppLayout() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-slate-100">
        <Navbar />
        <Outlet />
        <Footer />
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
    </>
  );
}

export default AppLayout;
