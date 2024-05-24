import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { successToast, user, errorToast } = useAuth();

  console.log(user);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosPublic.get("/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, [axiosPublic]);

  const handleChangeRole = async (userId, newRole) => {
    try {
      console.log("users inside handler", users);
      const foundUser = users.find((perUser) => perUser.email === user.email);
      if (foundUser._id === userId) {
        errorToast("You can't change your own role", 2000);
        return;
      }

      await axiosPublic.patch(`/users/${userId}/role`, { role: newRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          userId === user._id ? { ...user, role: newRole } : user
        )
      );
      successToast("User role changed successfully", 2000);
    } catch (error) {
      console.error("Failed to change user role", error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300">Name</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Email</th>
              <th className="px-6 py-3 border-b-2 border-gray-300">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((eachUser) => (
              <tr
                key={eachUser._id}
                className="hover:bg-gray-100 hover:cursor-pointer "
              >
                <td className="px-6 py-4 border-b border-gray-200 text-center">
                  {eachUser.userName}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-center">
                  {eachUser.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-center">
                  <select
                    value={eachUser.role}
                    onChange={(e) =>
                      handleChangeRole(eachUser._id, e.target.value)
                    }
                    className="bg-white border border-gray-300 rounded py-2 px-4 hover:cursor-pointer"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default ManageUsers;
