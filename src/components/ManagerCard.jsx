import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Button from "./Button";
import Swal from "sweetalert2";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { ToastContainer } from "react-toastify";

const ManagerCard = ({ manager, myData, data, setData }) => {
  const [loading, setLoading] = useState(false);
  const [serviceCount, setServiceCount] = useState(0);

  console.log("check category", data);
  console.log("check manager", manager);

  const { user, successToast, errorToast } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // console.log("matched data ", manager);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/api/category/${id}`);
        const filteredData = data.filter((data) => data._id !== res.data._id);
        setData(filteredData);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleEdit = async (id) => {
    console.log(id);
    navigate(`/dashboard/category/edit/${id}`);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const userInfo = await axiosPublic.get(`/users/${user.email}`);
      if (!userInfo) {
        throw new Error("User not found");
      } else {
        const body = {
          details: data.description,
          userPhoneNumber: data.phoneNumber,
          category: manager,
          user: userInfo.data,
        };
        console.log("body", body);
        const res = await axiosSecure.post(`/api/service/create`, body);
        console.log("res", res);
        console.log("res.data", res.data);
        if (res.status === 201) {
          successToast("Service Requested Successfully", 2000);
          reset();
          document.getElementById(manager._id).close();
        } else {
          throw new Error("Service Request Failed");
        }
      }
    } catch (error) {
      errorToast(error, 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosPublic.get(
        `api/service/service-count/${manager._id}`
      );
      console.log("each response", res.data.length);
      setServiceCount(res.data.length);
    };
    fetchData();
  }, [manager._id, axiosPublic]);

  return (
    <div className="col-span-1 shadow-md overflow-hidden border rounded-md bg-white">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-bold text-gray-800 highlight-text">
          {manager.managerName}
        </h2>
        <div className="flex items-center text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.1 0-2.1 0.4-3 1v6c1.8 1.4 3.9 2 6 2s4.2-0.6 6-2v-6c-0.9-0.6-2-1-3-1z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16v-6a2 2 0 1 1 4 0v6h-4z"
            />
          </svg>
          <span>{serviceCount} Services Done</span>
        </div>
      </div>
      <div className="px-4 py-2 border-b border-gray-200">
        <span className="text-gray-500">Area:</span> {manager.area}
      </div>
      <div className="px-4 py-2 border-b border-gray-200">
        <span className="text-gray-500">Category:</span> {manager.category}
      </div>
      <div className="px-4 py-2">
        <span className="text-gray-500">Service Charge:</span> $
        {manager.entryFee}
      </div>
      <div className="flex items-center justify-end p-4">
        {/* <button
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-700 font-bold rounded-lg px-4 py-2 focus:outline-none shadow-sm"
        >
          Request Service
        </button> */}

        {myData ? (
          <div className="flex gap-x-2">
            <button
              onClick={() => handleEdit(manager._id)}
              className="btn btn-sm btn-neutral rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(manager._id)}
              className="btn btn-sm btn-error rounded-md"
            >
              Delete
            </button>
          </div>
        ) : (
          <Button
            secondary
            className=" text-white px-3 py-1.5 rounded w-full text-sm"
            onClick={() =>
              document.getElementById(`${manager._id}`).showModal()
            }
          >
            Request Service
          </Button>
        )}
      </div>

      <Modal id={`${manager._id}`}>
        <div>
          <h1>{manager.managerName}</h1>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
                className={`mt-1 p-2 block w-full rounded-md border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 120,
                    message: "Description must be at least 120 characters",
                  },
                })}
                className={`mt-1 p-2 block w-full rounded-md border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex justify-start">
              {/* <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button> */}

              {/* <Button
                type="submit"
                className="px-3 py-1.5 text-xs rounded-sm"
                primary
              >
                Submit
              </Button> */}
              <Button
                type="submit"
                primary
                className="px-3 py-1.5 text-xs rounded-sm flex items-center gap-x-1"
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <FiLogIn />
                )}
                <span>{loading ? "Submitting..." : "Submit"} </span>
              </Button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer
        position="top-center"
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

export default ManagerCard;
