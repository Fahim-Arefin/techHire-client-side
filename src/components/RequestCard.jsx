import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Button from "./Button";

const RequestCard = ({ data, manager, onChange }) => {
  console.log("request data", data);
  const axiosSecure = useAxiosSecure();
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
    const res = await axiosSecure.patch(`/api/service/edit/${id}`, {
      status: "accepted",
    });

    if (res.status === 200) {
      onChange(id, "accepted");
    } else {
      throw new Error(`Couldn't update service`);
    }
  };
  const handleReject = async (id) => {
    console.log(id);
    const res = await axiosSecure.patch(`/api/service/edit/${id}`, {
      status: "rejected",
    });
    if (res.status === 200) {
      onChange(id, "rejected");
    } else {
      throw new Error(`Couldn't update service`);
    }
  };

  const handlePayment = (id) => {
    console.log(id);
    navigate(`/payment/${id}`);
  };

  const handleFinishService = async (id) => {
    console.log(id);
    const res = await axiosSecure.patch(`/api/service/edit/${id}`, {
      status: "completed",
    });
    if (res.status === 200) {
      onChange(id, "completed");
    } else {
      throw new Error(`Couldn't update service`);
    }
  };

  return (
    <div className="col-span-1 bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* header */}
      <div className="flex justify-between p-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-medium text-gray-800">
            {/* {data.category.area} */}
            {data.category.category}
          </h2>

          <div className="ml-auto text-sm text-gray-500">
            <span>{data.category.area}</span>
            <span className="ml-2 text-xs">(${data.category.entryFee})</span>
          </div>
        </div>
        <div
          className={`text-xs font-medium px-3 py-1 rounded-xl h-fit capitalize ${bg} ${text}`}
        >
          <span>{data.status}</span>
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
              {manager ? data.user.userName : data.category.managerName}
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
              ) : data.status === "paid" ||
                data.status === "accepted" ||
                data.status === "completed" ? (
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
                ? data.userPhoneNumber
                : data.status === "paid" ||
                  data.status === "accepted" ||
                  data.status === "completed"
                ? data.category.phoneNumber
                : ""}
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 px-4">{data.details}</p>
      </div>
      {/* footer */}
      <div className="">
        {/* manager */}
        {manager ? (
          data.status === "pending" ? (
            <div className="flex  p-4 bg-gray-100 border-t border-gray-200">
              <div className="text-xs flex gap-x-2">
                <Button
                  onClick={() => handleAccept(data._id)}
                  secondary
                  className="px-3 py-1.5 rounded-[4px]"
                >
                  accept
                </Button>
                <Button
                  onClick={() => handleReject(data._id)}
                  reject
                  className="px-3 py-1.5 rounded-[4px] bg-rose-500 text-white"
                >
                  reject
                </Button>
              </div>
            </div>
          ) : data.status === "accepted" ? (
            <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-[#1e91cf] text-center font-medium">
              <div>Client is now payment process.</div>
            </div>
          ) : data.status === "paid" ? (
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
                >
                  Finish Service
                </Button>
              </div>
            </div>
          ) : data.status === "completed" ? (
            <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-purple-500 text-center font-medium">
              You Successfully finish the service.
            </div>
          ) : (
            <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-red-500 text-center">
              You Rejected this Offer.
            </div>
          )
        ) : // user
        data.status === "pending" ? (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-[#1e91cf] text-center font-medium">
            please wait for manager response.
          </div>
        ) : data.status === "accepted" ? (
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
        ) : data.status === "paid" ? (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-[#1e91cf] text-center font-medium">
            <div>
              <div>Manager will contact to you soon.</div>
            </div>
          </div>
        ) : data.status === "completed" ? (
          <div className="capitalize text-xs p-4 bg-gray-100 border-t border-gray-200 text-purple-500 text-center">
            <div className="flex justify-between items-center">
              <div className="font-medium">Your Service is finished.</div>
              <Button secondary className="px-3 py-1 rounded-[4px] ">
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
    </div>
  );
};

export default RequestCard;
