import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Spinner from "./Spinner";

function SideBar() {
  // const [currentUser, setCurrentUser] = useState(null);
  // const { user } = useAuth();
  // const axiosPublic = useAxiosPublic();
  // console.log("user", user);

  // useEffect(() => {
  //   const fetchUserRole = async () => {
  //     const res = await axiosPublic.get(`/users/${user?.email}`);
  //     console.log("res.data", res.data);
  //     setCurrentUser(res?.data?.role);
  //   };

  //   if (user) {
  //     fetchUserRole();
  //   }
  // }, [axiosPublic, user?.email]);
  const [currentUser, loading] = useUserRole();

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
        {loading && <Spinner />}
        {!loading && (
          <>
            <ul className="menu p-4 w-72 min-h-screen bg-slate-200 text-base-content space-y-1 ">
              <div className="text-xl tracking-widest font-bold flex items-center space-x-4 rounded-lg border border-b-2 border-red-200 px-0">
                <div className="w-32 md:w-44 mx-auto h-[75px]">
                  <img
                    className="w-full h-full  "
                    src="/logo-transparent.png"
                    alt=""
                  />
                </div>
              </div>
              {/* Sidebar content here */}
              {currentUser === "manager" && (
                <>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/categories">My Category</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/category/new">
                      Create Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/service/request">
                      Service Request
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/dashboard/service/all">Given Service</NavLink>
                  </li> */}
                </>
              )}
              {(currentUser === "admin" || currentUser === "super-admin") && (
                <>
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/dashboard/users">Manage Users</NavLink>
                  </li>
                </>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;
