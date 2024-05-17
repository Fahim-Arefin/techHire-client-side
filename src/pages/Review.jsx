import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useParams, useSearchParams } from "react-router-dom";

const Review = () => {
  const [reviews, setReviews] = useState(null);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get(`/api/review/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [axiosPublic, id]);

  console.log("reviews", reviews);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg m-12">
      {/* {reviews && reviews.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {reviews[0]?.categoryId?.category}
          </h2>
          <p>
            <strong>Area:</strong> {reviews[0]?.categoryId?.area}
          </p>
          <p>
            <strong>Entry Fee:</strong> ${reviews[0]?.categoryId?.entryFee}
          </p>
          <p>
            <strong>Manager Name:</strong> {reviews[0]?.categoryId?.managerName}
          </p>
          <p>
            <strong>Manager Email:</strong>{" "}
            {reviews[0]?.categoryId?.managerEmail}
          </p>
          <p>
            <strong>Phone Number:</strong> {reviews[0]?.categoryId?.phoneNumber}
          </p>
          <p>
            <strong>Services Given:</strong>{" "}
            {reviews[0]?.categoryId?.serviceGiven}
          </p>
        </div>
      )} */}
      {reviews && reviews.length > 0 && (
        <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">
            {reviews[0]?.categoryId?.category}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-lg">
              <strong className="text-gray-700">Area:</strong>{" "}
              <span className="text-gray-900">
                {reviews[0]?.categoryId?.area}
              </span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Entry Fee:</strong>{" "}
              <span className="text-gray-900">
                ${reviews[0]?.categoryId?.entryFee}
              </span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Manager Name:</strong>{" "}
              <span className="text-gray-900">
                {reviews[0]?.categoryId?.managerName}
              </span>
            </p>
            <p className="text-lg text-pretty">
              <strong className="text-gray-700">Manager Email:</strong>{" "}
              <span className="text-gray-900">
                {reviews[0]?.categoryId?.managerEmail}
              </span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Phone Number:</strong>{" "}
              <span className="text-gray-900">
                {reviews[0]?.categoryId?.phoneNumber}
              </span>
            </p>
            <p className="text-lg">
              <strong className="text-gray-700">Services Given:</strong>{" "}
              <span className="text-gray-900">
                {searchParams.get("service")}
              </span>
            </p>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold mb-2">User Reviews</h2>
        {reviews &&
          reviews.map((review, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded-lg"
            >
              <div className="flex items-center mb-2">
                <img
                  src={review.userPhoto}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-bold">{review.userName}</p>
                  <p className="text-sm text-gray-600">{review.userEmail}</p>
                </div>
              </div>
              <div className="mb-2">
                <div className="rating">
                  <input
                    type="radio"
                    name={index}
                    className="mask mask-star-2 bg-yellow-400"
                    checked={review.rating === "1" ? true : false}
                  />
                  <input
                    type="radio"
                    name={index}
                    className="mask mask-star-2 bg-yellow-400"
                    checked={review.rating === "2" ? true : false}
                  />
                  <input
                    type="radio"
                    name={index}
                    className="mask mask-star-2 bg-yellow-400"
                    checked={review.rating === "3" ? true : false}
                  />
                  <input
                    type="radio"
                    name={index}
                    className="mask mask-star-2 bg-yellow-400"
                    checked={review.rating === "4" ? true : false}
                  />
                  <input
                    type="radio"
                    name={index}
                    className="mask mask-star-2 bg-yellow-400"
                    checked={review.rating === "5" ? true : false}
                  />
                </div>
              </div>
              <p>{review.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Review;
