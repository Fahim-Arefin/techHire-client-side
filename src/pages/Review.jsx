import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useParams, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import NoData from "../components/NoData";

const Review = () => {
  const [reviews, setReviews] = useState(null);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [avarageRating, setAvarageRating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get(`/api/review/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [axiosPublic, id]);

  useEffect(() => {
    if (reviews) {
      let sum = 0;
      reviews.map((review) => {
        sum += parseInt(review.rating);
      });
      console.log("sum", sum);
      const avarageRating = (sum / reviews.length).toFixed(1);
      console.log("avarageRating", avarageRating);
      setAvarageRating(avarageRating);
    }
  }, [reviews]);

  console.log("reviews", reviews);

  return (
    <div className="min-h-screen">
      {loading && <Spinner />}
      {reviews && reviews.length === 0 && <NoData />}
      {reviews && reviews.length > 0 && (
        <div className="p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg m-12">
          {reviews && reviews.length > 0 && (
            <div className="mb-6 p-6 bg-gray-100 rounded-lg shadow-md">
              <div className="flex gap-x-4 items-center mb-4">
                <h2 className="text-3xl font-bold text-blue-600 ">
                  {reviews[0]?.categoryId?.category}
                </h2>
                <span className="text-xl font-medium text-blue-600">
                  ({avarageRating})
                </span>
              </div>
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
            {reviews &&
              reviews.map((review, index) => (
                <>
                  <h2 className="text-2xl font-bold mb-2">User Reviews</h2>
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
                        <p className="text-sm text-gray-600">
                          {review.userEmail}
                        </p>
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
                </>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
