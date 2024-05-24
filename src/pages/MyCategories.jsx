import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import ManagerCard from "../components/ManagerCard";
import NoData from "../components/NoData";
import Spinner from "../components/Spinner";

function MyCategories() {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  console.log("data", data);

  useEffect(() => {
    const fetchManagerData = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(`/api/category/${user?.email}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchManagerData();
    }
  }, [axiosSecure, user]);
  return (
    <div>
      <h1 className="text-xl font-bold">My Categories</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mx-2 md:mx-6 xl:mx-12 my-24">
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
      {loading && <Spinner />}
      {data.length === 0 && !loading && <NoData className="w-full" />}
    </div>
  );
}

export default MyCategories;
