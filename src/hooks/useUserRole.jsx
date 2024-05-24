import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

function useUserRole() {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`/users/${user?.email}`);
        console.log("res.data", res.data);
        setCurrentUser(res?.data?.role);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [axiosPublic, user]);

  return [currentUser, loading];
}

export default useUserRole;
