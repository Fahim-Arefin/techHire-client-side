import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

function SideBar() {
  // const user = "user";
  const user = "manger";
  // const user = "admin";
  return (
    <div className="drawer lg:drawer-open h-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <FaBars />
        </label>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-slate-200 text-base-content">
          {/* Sidebar content here */}
          {user === "user" && (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </>
          )}
          {user === "manger" && (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/categories">My Category</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/category/new">Create Category</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/service/request">
                  Service Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/service/all">Given Service</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
