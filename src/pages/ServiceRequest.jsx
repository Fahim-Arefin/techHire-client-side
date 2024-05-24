import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import RequestCard from "../components/RequestCard";
import Spinner from "../components/Spinner";

function ServiceRequest() {
  const [data, setData] = useState(null);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = (id, status) => {
    console.log("status updated", id);
    const filteredData = data?.map((service) => {
      if (service._id === id) {
        return {
          ...service,
          status: status,
        };
      } else {
        return service;
      }
    });
    setData(filteredData);
  };

  console.log("user", user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(
          `/api/service/find/${user.email}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [axiosPublic, user]);

  console.log("my service requested : ", data);

  return (
    <div>
      <h1 className="text-xl font-bold">My Categories</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 mx-2 md:mx-6 xl:mx-12 my-24">
        {data &&
          data.map((service) => (
            <RequestCard
              key={service._id}
              data={service}
              manager
              onChange={handleUpdateStatus}
            />
          ))}
      </div>
      {loading && <Spinner />}
    </div>
  );
}

export default ServiceRequest;
