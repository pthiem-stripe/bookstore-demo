import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [paymentIntentId, setPaymentIntentId] = useState();
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState();
  const [paymentIntent, setPaymentIntent] = useState();
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const [currency, setCurrency] = useState();
  const [sku, setSku] = useState();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    setPaymentIntentId(query.payment_intent);
    setPaymentIntentClientSecret(query.payment_intent_client_secret);
    setTitle(query.title);
    setPrice(query.price);
    setImg(query.img);
    setCurrency(query.currency);
    setSku(query.sku);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (
      !paymentIntentId ||
      !title ||
      !price ||
      !img ||
      !currency ||
      !sku ||
      !paymentIntentClientSecret
    )
      return;
    setPageLoading(true);

    const fetchPaymentIntent = async () => {
      console.log("fetch");
      const getPaymentIntentDetailsResult = await fetch(
        "/.netlify/functions/getPaymentIntentDetails",
        {
          method: "POST",
          body: JSON.stringify({
            piId: paymentIntentId,
          }),
        }
      );

      const paymentIntent = await getPaymentIntentDetailsResult.json();

      if (paymentIntent.status !== "succeeded") navigateToPaymentError();

      setPaymentIntent(paymentIntent);
      setPageLoading(false);
    };

    fetchPaymentIntent();
  }, [
    paymentIntentId,
    title,
    price,
    sku,
    currency,
    img,
    paymentIntentClientSecret,
  ]);

  const paymentMethodDetails = () => {
    if (paymentIntent?.charges.data[0]?.payment_method_details.type === "card") {
      const cardDetails =
        paymentIntent.charges.data[0].payment_method_details.card;
      return (
        <div>
          {cardDetails.brand} ending with {cardDetails.last4} expiring{" "}
          {cardDetails.exp_month}/{cardDetails.exp_year}
        </div>
      );
    }
  };

  const navigateToPaymentError = () => {
    router.push(
      "/paymentError?title=" +
        title +
        "&img=" +
        img +
        "&price=" +
        price +
        "&currency=" +
        currency +
        "&sku=" +
        sku +
        "&payment_intent_client_secret=" +
        paymentIntentClientSecret
    );
  };

  return (
    <>
      {pageLoading ? (
        <div>
          <img className="h-8 w-8 mx-auto" src="loading.gif" />
          <div className="mt-4">Almost there...</div>
        </div>
      ) : (
        <div className=" max-w-6xl m-6 text-center w-full">
          <div className="flex flex-col w-full space-y-6">
            {paymentIntent?.status === "succeeded" && (
              <>
                <div className="mx-auto text-xl font-bold mb-12">
                  Payment successful
                </div>
                <img src={img} className="max-w-md mx-auto" />
                <div>
                  Your copy of <span className="font-bold">{title}</span> will
                  be on it's way soon
                </div>
              </>
            )}

            <div className="flex flex-col space-y-2 pt-12">
              <div className="">Payment Intent: {paymentIntentId}</div>

              <div className="">Payment Status: {paymentIntent?.status}</div>

              <div className="">Amount: <span className="uppercase">{paymentIntent?.currency}</span> {(paymentIntent?.amount_received / 10 )}</div>

              <div className="">
                Payment Method:{" "}
                {paymentIntent?.charges.data[0]?.payment_method_details.type}
              </div>
              {paymentMethodDetails()}
              <div>
                <a
                  href={paymentIntent?.charges.data[0]?.receipt_url}
                  target="_blank"
                >
                  Click here for your receipt
                </a>
              </div>
              <div>
                Copy of receipt was sent to:{" "}
                {paymentIntent?.charges.data[0]?.receipt_email}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
