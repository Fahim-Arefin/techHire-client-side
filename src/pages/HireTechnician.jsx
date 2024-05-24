import { useEffect, useRef, useState } from "react";
import ManagerCard from "../components/ManagerCard";
import SearchBar from "../components/SearchBar";
import useAxiosPublic from "../hooks/useAxiosPublic";
import NoData from "../components/NoData";

const HireTechnician = () => {
  const axiosPublic = useAxiosPublic();
  const [managerData, setManagerData] = useState([]);
  const [searchData, setSearchData] = useState(null);

  const searchDataExists = useRef(0);

  const handleSearch = (data) => {
    console.log("Searching with criteria:", data);
    searchDataExists.current = 0;
    setSearchData(data);
  };

  useEffect(() => {
    const fetchManagerData = async () => {
      const response = await axiosPublic.get("/api/category");
      setManagerData(response.data);
    };
    fetchManagerData();
  }, [axiosPublic]);

  console.log("managerData", managerData);

  return (
    <div className="grow ">
      <div className="bg-gradient-to-r from-[#f87060] via-indigo-600 to-[#f87060] py-12 text-white text-center h-[300px] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Welcome to Our Management System</h1>
        <p className="mt-4 text-lg">
          Find and connect with your preferred managers.
        </p>
      </div>
      {/* <SearchBar className="border " hidePanel /> */}
      <SearchBar
        className="bg-white rounded-tl-lg border shadow-md"
        hidePanel={true}
        onSubmitData={handleSearch}
      />
      {(!searchData || searchDataExists.current === 0) && <NoData />}
      {searchData && (
        // <div className="grid grid-cols-4 gap-5 mx-12 my-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mx-2 md:mx-6 xl:mx-12 my-24">
          {managerData.map((manager) => {
            if (
              manager.area.toLowerCase() === searchData.area.toLowerCase() &&
              manager.category === searchData.technicianCategory &&
              manager.entryFee >= parseInt(searchData.minCharge) &&
              manager.entryFee <= parseInt(searchData.maxCharge)
            ) {
              searchDataExists.current = 1;
              return <ManagerCard key={manager._id} manager={manager} />;
            }
          })}
        </div>
      )}
    </div>
  );
};

export default HireTechnician;
