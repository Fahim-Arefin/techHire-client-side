import { NavLink } from "react-router-dom";

import Button from "./Button";
import { FiLogIn } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import UserDropdown from "./UserDropdown";

function Navbar({ className }) {
  const { user } = useAuth();
  // const navigate = useNavigate();
  console.log(user);
  console.log(user?.photoURL);

  // const handleLogOut = () => {
  //   logOut()
  //     .then(() => {
  //       // console.log("Logged out");
  //       navigate("/login");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  return (
    <div
      className={`sticky shadow-md top-0 bg-white  z-50 px-12 mx-auto navbar ${className}`}
      style={{ fontWeight: 500 }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-30 p-2 py-4 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/hire">Hire Technician</NavLink>
            </li>
            <li>
              <NavLink to="/service/request">Requested Services</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="text-xl tracking-widest font-bold flex items-center space-x-4 px-6 py-4 rounded-lg">
          <div className="w-32 md:w-44">
            <img className="w-full h-full" src="/logo.png" alt="" />
          </div>
          {/* <span className="bg-gradient-to-r from-yellow-500 to-orange-400 text-transparent bg-clip-text text-xl lg:text-2xl">
            JobZen
          </span> */}
        </div>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="option-menu flex space-x-4 text-[#555] text-xs uppercase tracking-wide">
          <li>
            <NavLink
              className="cursor-pointer hover:border-b hover:border-b-[#f87060] hover:text-[#f87060] transition-all duration-150 px-1 py-1 rounded-sm "
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="cursor-pointer hover:border-b hover:border-b-[#f87060] hover:text-[#f87060] transition-all duration-150 px-1 py-1 rounded-sm "
              to="/hire"
            >
              Hire Technician
            </NavLink>
          </li>

          <li>
            <NavLink
              className="cursor-pointer hover:border-b hover:border-b-[#f87060] hover:text-[#f87060] transition-all duration-150 px-1 py-1 rounded-sm "
              to="/service/request"
            >
              Requested Services
            </NavLink>
          </li>

          {user && (
            <li>
              <NavLink
                className="cursor-pointer hover:border-b hover:border-b-[#f87060] hover:text-[#f87060] transition-all duration-150 px-1 py-1 rounded-sm "
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <UserDropdown />
        ) : (
          <div>
            <Button
              to="/login"
              primary
              outline
              className="px-3 py-2 flex space-x-2 rounded-sm text-xs"
            >
              <FiLogIn className="mt-[3px]" />
              <span>Log In</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
