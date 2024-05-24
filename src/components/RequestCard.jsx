import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Button from "./Button";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { ToastContainer } from "react-toastify";

const RequestCard = ({ data, manager, onChange }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [acceptLoading, setAcceptLoading] = useState();
  const [loading, setLoading] = useState(false);
  const { user, successToast, errorToast } = useAuth();

  console.log("request data", data);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // Define a function to get appropriate styles based on the status
  const getStatusStyles = (status) => {
    switch (status) {
      case "pending":
        return { bg: "bg-[#1e91cf]", text: "text-white" };
      case "accepted":
        return { bg: "bg-green-400", text: "text-white" };
      case "rejected":
        return { bg: "bg-rose-400", text: "text-white" };
      case "paid":
        return { bg: "bg-gray-700", text: "text-white" };
      case "completed":
        return { bg: "bg-purple-500", text: "text-white" };
      default:
        return { bg: "", text: "" }; // Default styles if status doesn't match
    }
  };

  // Get the appropriate styles based on the status
  const { bg, text } = getStatusStyles(data.status);
  const navigate = useNavigate();

  const handleAccept = async (id) => {
    console.log(id);
    setAcceptLoading(true);
    const res = await axiosSecure.patch(`/api/service/edit/${id}`, {
      status: "accepted",
    });

    if (res.status === 200) {
      onChange(id, "accepted");
      setAcceptLoading(false);
    } else {
      setAcceptLoading(false);
      throw new Error(`Couldn't update service`);
    }
  };
  const handleReject = async (id) => {
    setLoading(true);
    console.log(id);
    const res = await axiosSecure.patch(`/api/service/edit/${id}`, {
      status: "rejected",
    });
    if (res.status === 200) {
      onChange(id, "rejected");
      setLoading(false);
    } else {
      setLoading(false);
      throw new Error(`Couldn't update service`);
    }
  };

  const handlePayment = (id) => {
    console.log(id);
    navigate(`/payment/${id}`);
  };

  const handleFinishService = async (id) => {
    setLoading(true);
    console.log(id);
    const res = await axiosSecure.patch(`/api/service/edit/${id}`, {
      status: "completed",
    });
    if (res.status === 200) {
      onChange(id, "completed");
      setLoading(false);
    } else {
      setLoading(false);
      throw new Error(`Couldn't update service`);
    }
  };

  const onSubmit = async (body) => {
    try {
      setLoading(true);
      const userInfo = await axiosPublic.get(`/users/${user.email}`);
      if (!userInfo) {
        throw new Error("User not found");
      } else {
        body.categoryId = data.category._id;
        body.userName = user.displayName;
        body.userEmail = user.email;
        body.userPhoto = user.photoURL;
        console.log("body", body);

        const res = await axiosSecure.post(`/api/review/create`, body);
        console.log("res", res);
        console.log("res.data", res.data);
        if (res.status === 201) {
          successToast("Thanks for your review", 2000);
          reset();
          document.getElementById(data._id).close();
        } else {
          throw new Error("Review create Failed");
        }
      }
    } catch (error) {
      errorToast(error, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-span-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* header */}
      <div className="flex justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-medium text-gray-800">
            {/* {data.category.area} */}
            {data?.category?.category}
          </h2>

          <div className="ml-auto text-sm text-gray-500">
            <span>{data?.category?.area}</span>
            <span className="ml-2 text-xs">(${data?.category?.entryFee})</span>
          </div>
        </div>
        <div
          className={`text-xs font-medium px-3 py-1 rounded-xl h-fit capitalize ${bg} ${text}`}
        >
          <span>{data?.status}</span>
        </div>
      </div>
      {/* body */}
      <div className="py-4 grow">
        <div className="flex gap-x-4  mb-2 border-b border-gray-200 px-4 pb-4">
          <div className="flex gap-x-2 items-end">
            <div>
              <img
                className="w-4 h-4"
                src="/clerk-with-tie.png"
                alt="request icon"
              />
            </div>
            <p className="text-xs font-medium text-gray-800">
              {manager ? data?.user?.userName : data?.category?.managerName}
            </p>
          </div>
          <div className="flex gap-x-2 items-end">
            <div>
              {manager ? (
                <img
                  className="w-4 h-4"
                  src="/telephone.png"
                  alt="request icon"
                />
              ) : data?.status === "paid" ||
                data?.status === "accepted" ||
                data?.status === "completed" ? (
                <img
                  className="w-4 h-4"
                  src="/telephone.png"
                  alt="request icon"
                />
              ) : (
                ""
              )}
            </div>
            <p className="text-xs font-medium text-gray-800">
              {manager
                ? data?.userPhoneNumber
                : data?.status === "paid" ||
                  data?.status === "accepted" ||
                  data?.status === "completed"
                ? data?.category?.phoneNumber
                : ""}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 px-4">{data?.details}</p>
      </div>
      {/* footer */}
      <div className="">
        {/* manager */}
        {manager ? (
          data?.status === "pending" ? (
            <div className="flex  p-4 bg-gray-100 border-t border-gray-200">
              <div className="text-xs flex gap-x-2">
                <Button
                  onClick={() => handleAccept(data._id)}
                  secondary
                  className="px-3 py-1.5 rounded-[4px] text-xs"
                  loading={acceptLoading}
                >
                  accept
                </Button>
                <Button
                  onClick={() => handleReject(data._id)}
                  reject
                  className="px-3 py-1.5 rounded-[4px] bg-rose-500 text-white text-xs"
                  loading={loading}
                >
                  reject
                </Button>
              </div>
            </div>
          ) : data?.status === "accepted" ? (
            <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-[#1e91cf] text-center font-medium">
              <div>Client is now payment process.</div>
            </div>
          ) : data?.status === "paid" ? (
            <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-center">
              <div className="flex justify-between items-center">
                <div className="font-medium">
                  Client is waiting for your physical response
                </div>
                <Button
                  onClick={() => handleFinishService(data._id)}
                  secondary
                  outline
                  className="px-3 py-1 rounded-[4px]  "
                  loading={loading}
                >
                  Finish Service
                </Button>
              </div>
            </div>
          ) : data?.status === "completed" ? (
            <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-purple-500 text-center font-medium">
              You Successfully finish the service.
            </div>
          ) : (
            <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-red-500 text-center">
              You Rejected this Offer.
            </div>
          )
        ) : // user
        data?.status === "pending" ? (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-[#1e91cf] text-center font-medium">
            please wait for manager response.
          </div>
        ) : data?.status === "accepted" ? (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-[#1e91cf] text-center font-medium">
            <div className="flex justify-end items-center">
              {/* <div>
                Contact :{" "}
                <span className="text-xs font-medium text-gray-800">
                  {data?.category?.phoneNumber}
                </span>
              </div> */}
              <Button
                onClick={() => handlePayment(data._id)}
                secondary
                className="px-3 py-1 rounded-[4px] "
              >
                Pay ${data.category.entryFee}
              </Button>
            </div>
          </div>
        ) : data?.status === "paid" ? (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-[#1e91cf] text-center font-medium">
            <div>
              <div>Manager will contact to you soon.</div>
            </div>
          </div>
        ) : data?.status === "completed" ? (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-purple-500 text-center">
            <div className="flex justify-between items-center">
              <div className="font-medium">Your Service have finished.</div>
              <Button
                secondary
                className="px-3 py-1 rounded-[4px]"
                onClick={() =>
                  document.getElementById(`${data._id}`).showModal()
                }
              >
                Give Review
              </Button>
            </div>
          </div>
        ) : (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-red-500 text-center font-medium">
            Manager is currently busy.
          </div>
        )}
      </div>

      {/* modal */}
      {/* <Modal id={`${data._id}`}>
        <div>
          <h1>{data.category.category}</h1>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 ">
              <input
                readOnly
                value={data.user.userName}
                className={`mt-1 p-2 block w-full rounded-md border ${
                  errors.phoneNumber ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-300 cursor-not-allowed`}
              />
            </div>
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
      </Modal> */}
      <Modal id={`${data._id}`}>
        <div>
          <h1>{data?.category?.category}</h1>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                readOnly
                value={data.user.userName}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-slate-300 cursor-not-allowed"
              />
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
            <div className="mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <div className="rating">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  {...register("rating", { required: "Rating is required" })}
                  className="mask mask-star-2 bg-black"
                />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  {...register("rating")}
                  className="mask mask-star-2 bg-black"
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  {...register("rating")}
                  className="mask mask-star-2 bg-black"
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  {...register("rating")}
                  className="mask mask-star-2 bg-black"
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  {...register("rating")}
                  className="mask mask-star-2 bg-black"
                />
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating.message}
                </p>
              )}
            </div>
            <div className="flex justify-start">
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

export default RequestCard;
