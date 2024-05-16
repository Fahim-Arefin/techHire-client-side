import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, successToast, errorToast } = useAuth();
  const [editData, setEditData] = useState({});

  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    data.managerEmail = user.email;
    data.managerName = user.displayName;

    if (id) {
      const res = await axiosPublic.patch(`/api/category/${id}`, data);
      if (res.status === 200) {
        console.log("res data", res.data);
        successToast("Category Updated Successfully", 2000);
        reset();
        navigate("/dashboard/categories");
      } else {
        errorToast(res.data.message, 2000);
      }
    } else {
      const res = await axiosPublic.post("/api/category", data);
      if (res.status === 201) {
        console.log("res data", res.data);
        successToast("Category Added Successfully", 2000);
        reset();
      } else {
        errorToast(res.data.message, 2000);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // fetch data for category using category id
      const res = await axiosPublic.get(`/api/category/find/${id}`);
      setEditData(res.data);
    };

    if (id) {
      fetchData();
    }
  }, [axiosPublic, id]);

  useEffect(() => {
    if (id) {
      console.log("inside useEffect");
      setValue("area", editData.area);
      setValue("category", editData.category);
      setValue("entryFee", editData.entryFee);
      setValue("phoneNumber", editData.phoneNumber);
    }
  }, [id, editData]);

  return (
    <div className="max-w-6xl mx-auto m-12 p-12 bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {id ? "Update A Category" : "Create New Category"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700"
          >
            Area Name
          </label>
          <input
            type="text"
            id="area"
            {...register("area", { required: true })}
            className="mt-1 p-3 w-full border rounded-md"
          />
          {errors.area && (
            <span className="text-red-500 text-sm">Area Name is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: true })}
            className="mt-1 p-3 w-full border rounded-md"
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
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">Category is required</span>
          )}
        </div>
        <div>
          <label
            htmlFor="entryFee"
            className="block text-sm font-medium text-gray-700"
          >
            Entry Fee
          </label>
          <input
            type="number"
            id="entryFee"
            {...register("entryFee", { required: true, min: 0 })}
            className="mt-1 p-3 w-full border rounded-md"
          />
          {errors.entryFee && (
            <span className="text-red-500 text-sm">
              Entry Fee is required and must be a positive number
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Your Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber", {
              required: true,
              pattern: /^\d{11}$/,
            })}
            className="mt-1 p-3 w-full border rounded-md"
          />
          {errors.phoneNumber && (
            <span className="text-red-500 text-sm">
              Phone Number is required and must be 11 digits
            </span>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 w-full"
          >
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
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
};

export default Category;
