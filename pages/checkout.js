import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "../components/Checkout/checkoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);

const elementsAppearance = {
  theme: "stripe",
  variables: {
    fontSizeBase: "0.875rem",
    fontFamily:
      'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    colorText: "#374151",
  },
};

export default function Home() {
  const router = useRouter();

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const [currency, setCurrency] = useState();
  const [sku, setSku] = useState();
  const [clientSecret, setClientSecret] = useState();

  const [pageLoading, setPageLoading] = useState(false);
  const [elementReady, setElementReady] = useState(false);
  const [showLoadingSpinnger, setShowLoadingSpinner] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;

    setTitle(query.title);
    setPrice(query.price);
    setImg(query.img);
    setCurrency(query.currency);
    setSku(query.sku);
    if (query.payment_intent_client_secret)
      setClientSecret(query.payment_intent_client_secret);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!title || !price || !img || !currency || !sku) return;

    if (clientSecret) return; //redirect from error page, reuse pi instead of loading new one.

    const fetchClientSecret = async () => {
      const createPaymentIntentResult = await fetch(
        "/.netlify/functions/createPaymentIntent",
        {
          method: "POST",
          body: JSON.stringify({
            amount: price * 100,
            currency: currency,
            sku: sku,
          }),
        }
      );

      const paymentIntenClientSecret = (await createPaymentIntentResult.json())
        .clientSecret;
      setClientSecret(paymentIntenClientSecret);
      setPageLoading(false);
    };

    fetchClientSecret();
  }, [price, title, img, currency, sku, clientSecret]);

  useEffect(() => {
    if (!pageLoading && elementReady) setShowLoadingSpinner(false);
    else setShowLoadingSpinner(true);
  }, [pageLoading, elementReady]);

  const updateElementReadyState = (isReady) => {
    setElementReady(isReady);
  };

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
                    options={{
                      clientSecret: clientSecret,
                      appearance: elementsAppearance,
                    }}
                  >
                    <CheckoutForm
                      elementReady={(isReady) =>
                        updateElementReadyState(isReady)
                      }
                      title={title}
                      img={img}
                      price={price}
                      sku={sku}
                      currency={currency}
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
