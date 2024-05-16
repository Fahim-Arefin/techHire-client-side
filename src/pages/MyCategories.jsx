import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import ManagerCard from "../components/ManagerCard";

function MyCategories() {
  const { user } = useAuth();
  const [data, setData] = useState();
  const axiosSecure = useAxiosSecure();

  console.log("data", data);

  useEffect(() => {
    const fetchManagerData = async () => {
      const response = await axiosSecure.get(`/api/category/${user?.email}`);
      setData(response.data);
    };
    if (user) {
      fetchManagerData();
    }
  }, [axiosSecure, user]);
  return (
    <div>
      <h1 className="text-xl font-bold">My Categories</h1>
      <div className="grid grid-cols-3 gap-5 m-12">
        {data &&
          data.map((manager) => (
            <ManagerCard
              key={manager._id}
              manager={manager}
              myData
              data={data}
              setData={setData}
            />
          ))}
      </div>
    </div>
  );
}

export default MyCategories;
