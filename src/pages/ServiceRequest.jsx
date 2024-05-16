import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import RequestCard from "../components/RequestCard";

function ServiceRequest() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const handleUpdateStatus = (id, status) => {
    console.log("status updated", id);
    const filteredData = data.map((service) => {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(
          `/api/service/find/${user.email}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axiosPublic, user]);

  console.log("my service requested : ", data);

  return (
    <div>
      <h1 className="text-xl font-bold">My Categories</h1>
      <div className="grid grid-cols-3 gap-5 m-12">
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
    </div>
  );
}

export default ServiceRequest;
