import { useRouter } from "next/router";
import products from "./../components/products.json"

export default function Home() {
  const router = useRouter();


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
                  <img src={v.image} className="rounded-t"></img>
                </div>
                <div className="m-5 flex flex-col space-y-3 ">
                  <div className="text-lg font-bold">{v.title}</div>
                  <div className="text-lg">{v.author}</div>
                  <div className="py-4">{v.description}</div>
                </div>
                <div className="mt-auto px-5 mb-5">
                  <button
                    className="buttonPrimary w-full"
                    onClick={() =>
                      navigate(v.title, v.image, v.price, v.currency, v.sku)
                    }
                  >
                    purchase - {v.currency} {v.price}
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
