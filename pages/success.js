import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [paymentIntent, setPaymentIntent] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;
    setPaymentIntent(query.payment_intent);
  }, [router.isReady, router.query]);

  return (
    <>
      <div className=" max-w-6xl m-6 text-center w-full">
        <div className="mx-auto text-lg font-bold">Payment successful</div>
        <div className="mt-6">Payment Intent: {paymentIntent}</div>
      </div>
    </>
  );
}
