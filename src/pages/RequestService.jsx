import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import RequestCard from "../components/RequestCard";

function RequestService() {
  const [data, setData] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(
          `/api/service/request/${user.email}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axiosPublic, user]);

  console.log("user request service data", data);

  return (
    <div className="grow ">
      <div className="bg-gradient-to-r from-indigo-600 via-[#f87060] to-indigo-600 py-12 text-white text-center h-[300px] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Welcome to Our Management System</h1>
        <p className="mt-4 text-lg">
          Find and connect with your preferred managers.
        </p>
      </div>
      <div className="w-[60%] h-20 mx-auto bg-white -mt-9 p-2 rounded-md border shadow-md flex justify-center items-center text-[16px] font-medium">
        TechHireHub / Request Services
      </div>
      {data && (
        <div className="grid grid-cols-4 gap-5 mx-12 my-24">
          {data.map((service) => (
            <RequestCard key={service._id} data={service} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestService;
