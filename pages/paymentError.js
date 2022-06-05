import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [paymentIntentClientSecret, setPaymentIntentClientSecret] = useState();
  
  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [img, setImg] = useState();
  const [currency, setCurrency] = useState();
  const [sku, setSku] = useState();
  

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;


setPaymentIntentClientSecret(query.payment_intent_client_secret);
    setTitle(query.title);
    setPrice(query.price);
    setImg(query.img);
    setCurrency(query.currency);
    setSku(query.sku);
  }, [router.isReady, router.query]);

  const navigateToCheckout = () => {
    router.push(
      "/checkout?title=" +
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
    <div className=" max-w-6xl m-6 text-center ">
      <div className="flex flex-col space-y-6">
        <div className="mx-auto text-xl font-bold mb-12">Payment failed</div>
        <div>
          We unfortunately encountered an error while processing your payment.
        </div>
        <div>Click the button below to go back to your Cart to try again.</div>

        <button className="buttonPrimary" onClick={() => navigateToCheckout()}>
          Go to Cart
        </button>
      </div>
    </div>
  );
}
