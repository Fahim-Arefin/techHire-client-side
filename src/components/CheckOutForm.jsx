import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "./Button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("[error]", error);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
      // mutation.mutate({ id, transactionId: paymentMethod.id });
      const res = await axiosSecure.post(`/api/payment/create`, {
        serviceId: id,
        transactionId: paymentMethod.id,
      });

      if (res.status === 201) {
        // change the status of the service
        const res2 = await axiosSecure.patch(`/api/service/edit/${id}`, {
          status: "paid",
        });
        if (res2.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate("/service/request");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "status changed to paid failed!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Payment creation failed!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          primary
          outline
          className="px-3 py-2 rounded-md mt-6 mb-2 flex items-center space-x-2"
          type="submit"
          disabled={!stripe}
        >
          (
          <div className="w-6 h-6 ">
            <img
              className="h-full w-full"
              src="https://img.icons8.com/ios-filled/50/card-in-use.png"
              alt="card-in-use"
            />
          </div>
          )
          <span className="">
            {/* {mutation.isPending ? "Paying..." : "Payment"} */}
            payment
          </span>
        </Button>
      </form>
      <div className="text-[#f87060]">{error}</div>
    </>
  );
};

export default CheckoutForm;
