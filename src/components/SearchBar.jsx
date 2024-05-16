import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";

const SearchBar = ({ className, hidePanel, onSubmitData }) => {
  const [area, setArea] = useState("");
  const [technicianCategory, setTechnicianCategory] = useState("");
  const [arrow, setArrow] = useState(hidePanel ? hidePanel : false);
  const [minCharge, setMinCharge] = useState(0);
  const [maxCharge, setMaxCharge] = useState(1000);

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setTechnicianCategory(e.target.value);
  };

  const handleMinChargeChange = (e) => {
    setMinCharge(e.target.value);
  };

  const handleMaxChargeChange = (e) => {
    setMaxCharge(e.target.value);
  };

  // const handleSearch = () => {
  //   // Perform search based on criteria
  //   const data = {
  //     area,
  //     technicianCategory,
  //     minCharge,
  //     maxCharge,
  //   };
  //   console.log("Searching with criteria:", data);
  // };

  return (
    <div>
      <div
        className={`flex items-center justify-around flex-wrap inset-x-0 w-[90%] lg:w-[50%] mx-auto -mt-12 z-20 rounded-b-lg rounded-tr-lg ${
          arrow ? "h-[150px]" : "h-[100px] "
        } ${className}`}
      >
        {!hidePanel && (
          <div
            onClick={() => setArrow(!arrow)}
            className="w-9 h-9 absolute left-0 -top-9  flex items-center justify-center bg-white rounded-t-md cursor-pointer"
          >
            {arrow ? (
              <IoIosArrowDown className="font-bold text-xl" />
            ) : (
              <IoIosArrowUp className="font-bold text-xl" />
            )}
          </div>
        )}
        <div className="w-[30%] bg-red-200 ">
          <input
            type="text"
            id="area"
            placeholder="Area"
            value={area}
            onChange={handleAreaChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div className="w-[30%] bg-red-200 ">
          <select
            id="category"
            value={technicianCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded px-2 py-1 w-full"
          >
            <option value="">Select a category</option>
            <option value="Electrical Technicians">
              Electrical Technicians
            </option>
            <option value="Mechanical Technicians">
              Mechanical Technicians
            </option>
            <option value="HVAC Technicians">
              HVAC (Heating, Ventilation, and Air Conditioning) Technicians
            </option>
            <option value="Electronics Technicians">
              Electronics Technicians
            </option>
            <option value="IT Technicians">
              IT (Information Technology) Technicians
            </option>
            <option value="Automotive Technicians">
              Automotive Technicians
            </option>
            <option value="Plumbing Technicians">Plumbing Technicians</option>
            <option value="Instrumentation Technicians">
              Instrumentation Technicians
            </option>
            <option value="Telecommunications Technicians">
              Telecommunications Technicians
            </option>
            <option value="Biomedical Equipment Technicians">
              Biomedical Equipment Technicians
            </option>
            <option value="Manufacturing Technicians">
              Manufacturing Technicians
            </option>
            <option value="Renewable Energy Technicians">
              Renewable Energy Technicians (Solar, Wind, etc.)
            </option>
            <option value="Aerospace Technicians">Aerospace Technicians</option>
            <option value="Robotics Technicians">Robotics Technicians</option>
            <option value="Chemical Laboratory Technicians">
              Chemical Laboratory Technicians
            </option>
            <option value="Construction Technicians">
              Construction Technicians
            </option>
            <option value="Maintenance Technicians">
              Maintenance Technicians
            </option>
            <option value="Quality Control Technicians">
              Quality Control Technicians
            </option>
            <option value="Network Technicians">Network Technicians</option>
            <option value="Audio-Visual Technicians">
              Audio-Visual Technicians
            </option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="w-[30%]">
          <Button
            primary
            onClick={() =>
              onSubmitData({
                area,
                technicianCategory,
                minCharge,
                maxCharge,
              })
            }
            className=" text-white px-4 py-2 rounded w-full"
          >
            Search
          </Button>
        </div>
        <div className={`w-[100%] text-center ${arrow ? "block" : "hidden"}`}>
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center mr-8">
              <label htmlFor="minCharge" className="mb-1">
                Start Price Range:
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="minCharge"
                  value={minCharge}
                  min={0}
                  max={5000} // Adjust max value according to your requirements
                  onChange={handleMinChargeChange}
                  className="border border-gray-300 rounded px-2 py-1 mb-2 w-48"
                />
                <span className="ml-2">${minCharge}</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="maxCharge" className="mb-1">
                End Price Range:
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  id="maxCharge"
                  value={maxCharge}
                  min={0}
                  max={5000} // Adjust max value according to your requirements
                  onChange={handleMaxChargeChange}
                  className="border border-gray-300 rounded px-2 py-1 mb-2 w-48"
                />
                <span className="ml-2">${maxCharge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
