import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";


const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState();
  const [pageLoading, setPageLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setPageLoading(true);
    setErrorMessage(null);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_SUCCESS_URL + "/?title=" + props.title + "&imgSrc=" + props.imgSrc,
        receipt_email: email,
      },
    });

    if (response.error) setErrorMessage(response.error.message);
    setPageLoading(false);
  };

  return (
    <form onSubmit={submitForm}>
      <div className="w-full">
        <PaymentElement
          className="mb-3"          
          onReady={() => {
            props.elementReady(true);
          }}
        />
        <label className="text-md text-gray-600 text-opacity-90">E-Mail</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="appearance-none block w-full rounded shadow-sm 
          text-gray-600 border placeholder-gray-700 placeholder-opacity-80 border-gray-200  
          py-3 px-4 mb-3 leading-tight  mt-1
          focus:outline-0 focus:bg-white focus:ring-4"
          id="grid-email"
          placeholder="john@doe.com"
          type="email"
        />
      </div>
      {pageLoading ? (
        <img className="h-6 w-6 mt-6 mx-auto" src="loading.gif" />
      ) : (
        <button disabled={!stripe} className="buttonPrimary w-full mt-6">
          Confirm Order
        </button>
      )}
      {errorMessage ? (
        <div className="mt-6 text-red text-base text-center text-red-600">
          {errorMessage}
        </div>
      ) : null}
    </form>
  );
};

export default CheckoutForm;
