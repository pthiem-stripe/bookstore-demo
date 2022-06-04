import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../components/Checkout/checkoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

export default function Home() {
  const router = useRouter();

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const [currency, setCurrency] = useState();
  const [clientSecret, setClientSecret] = useState();

  const [pageLoading, setPageLoading] = useState(true);
  const [elementReady, setElementReady] = useState(false);
  const [showLoadingSpinnger, setShowLoadingSpinner] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;

    setTitle(query.title);
    setPrice(query.price);
    setImg(query.img);
    setCurrency(query.currency);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!title || !price || !img || !currency) return;


    setPageLoading(true);

    const fetchClientSecret = async () => {
      const createPaymentIntentResult = await fetch(
        "/.netlify/functions/createPaymentIntent",
        {
          method: "POST",
          body: JSON.stringify({
            amount: price * 10,
            currency: currency,
          }),
        }
      );

      const paymentIntenClientSecret = (await createPaymentIntentResult.json())
        .clientSecret;
      setClientSecret(paymentIntenClientSecret);
      setPageLoading(false);
    };

    fetchClientSecret();
  }, [price, title, img]);

  useEffect(() => {
    if (!pageLoading && elementReady) setShowLoadingSpinner(false);
    else setShowLoadingSpinner(true);
  }, [pageLoading, elementReady]);

  const updateElementReadyState = (isReady) => {
      setElementReady(isReady);
  }

  return (
    <>
      <div className={showLoadingSpinnger ? "visible" : "hidden"}>
        <img className="h-8 w-8 mx-auto" src="loading.gif" />
        <div className="mt-4">
          Please wait while we are getting things ready...
        </div>
      </div>
      <div className={showLoadingSpinnger ? "invisible" : "visible"}>
        <div className="grid grid-cols-2 gap-x-8 max-w-6xl m-6 w-full ">
          <div className="w-full flex flex-col">
            <div className="font-bold text-lg">Payment Details</div>
            <div className="mt-8">
              {clientSecret ? (
                <div>
                  <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: clientSecret }}
                  >
                    <CheckoutForm
                      elementReady={(isReady) => updateElementReadyState(isReady)}
                    />
                  </Elements>
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="font-bold text-lg">Your Order</div>
            <div className="border rounded shadow bg-white mt-8">
              <div className="flex flex-col h-full rounded">
                <div>
                  <img src={img} className="rounded-t"></img>
                </div>
                <div className="m-5 flex justify-between font-bold text-lg ">
                  <div>{title}</div>
                  <div className="uppercase">
                    {currency} {price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
