import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(products.length > 0) return
    const fetchProducts = async () => {
      const fetchProductsResult = await fetch(
        "/.netlify/functions/getProducts",
        { method: "POST" }
      );

      const products = await fetchProductsResult.json();

      let productPriceArray = [];

      products.forEach(async (element) => {
        console.log("fetch price for ");
        const fetchPriceResult = await fetch("/.netlify/functions/getPrice", {
          method: "POST",
          body: JSON.stringify({
            priceId: element.default_price,
          }),
        });
        const price = await fetchPriceResult.json();
        productPriceArray.push({ ...element, ...price });
      });
      console.log(productPriceArray);
      setProducts(productPriceArray);
    };
    fetchProducts();
  }, []);

  const navigate = (title, img, price, currency, sku) => {
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
        sku
    );
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-x-8 max-w-6xl m-6 ">
        {products.map((v, i) => {
          return (
            <div className="border rounded shadow bg-white" key={i}>
              <div className="flex flex-col h-full rounded">
                <div>
                  <img src={v.images[0]} className="rounded-t"></img>
                </div>
                <div className="m-5 flex flex-col space-y-3 ">
                  <div className="text-lg font-bold">{v.name}</div>
                  <div className="text-lg">{v.metadata.Author}</div>
                  <div className="py-4">{v.description}</div>
                </div>
                <div className="mt-auto px-5 mb-5">
                  <button
                    className="buttonPrimary w-full"
                 
                  >
                    purchase - {v.currency} {v.unit_amount}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
