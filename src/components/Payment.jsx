import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";

// Add publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PAYMENT_GATEWAY_PK
);

function Payment() {
  return (
    <>
      <div className="h-screen py-24 px-4 xl:px-24 overflow-y-scroll">
        <div className="my-12 md:w-[60%] mx-auto bg-gray-100 rounded-md shadow-md p-12">
          <div className="text-3xl font-semibold my-5">Pay Your Bill</div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </>
  );
}

export default Payment;
