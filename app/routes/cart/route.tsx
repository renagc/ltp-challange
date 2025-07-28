import { ProductImage } from "~/components/ProductImage";
import { useCartContext } from "~/hooks/use-cart-context";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from "react";

export default function Cart() {
  const { reducer } = useCartContext();
  const [code, setCode] = useState<string>("");

  const subTotal = useMemo(() => {
    const subTotalSum = reducer.state.reduce(
      (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
      0
    );
    return subTotalSum.toFixed(2);
  }, [reducer.state]);

  return (
    <div className="md:flex pt-20 pb-80 md:pb-0 p-4 md:space-x-12">
      <ul className="flex flex-col gap-4 w-full">
        {reducer.state.map((cartItem, index) => (
          <>
            <li key={index} className="flex flex-col sm:flex-row gap-4">
              <div className="w-32">
                <ProductImage
                  src={cartItem.product.images[0]}
                  alt={cartItem.product.title}
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="uppercase font-light text-sm">
                  <h3>{cartItem.product.title}</h3>
                  <h3>{cartItem.product.price} €</h3>
                </div>
                <div className="flex gap-4">
                  <div className="flex gap-4 items-center border border-black rounded-lg px-3 py-1 font-light">
                    <button>-</button>
                    <h3 className="text-xs">{cartItem.quantity}</h3>
                    <button
                      onClick={() => reducer.addProduct(cartItem.product)}
                    >
                      +
                    </button>
                  </div>
                  <button>
                    <TrashIcon className="size-5" />
                  </button>
                </div>
              </div>
            </li>
            {index < reducer.state.length - 1 && (
              <span className="block border-black w-full border-t my-4"></span>
            )}
          </>
        ))}
      </ul>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 w-full md:max-w-lg md:static md:border md:border-black md:rounded-lg md:h-fit flex flex-col gap-2 md:justify-center md:gap-6 uppercase font-light">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-sm md:text-xl font-bold">Cart Summary</h1>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <h2>SubTotal</h2>
              <h2>{subTotal} €</h2>
            </div>
            <div className="flex justify-between text-sm">
              <h2>Shipping</h2>
              <h2>20.00 €</h2>
            </div>
            <div className="flex justify-between text-sm">
              <h2>Total €</h2>
              <h2>{(Number(subTotal) + 20).toFixed(2)} €</h2>
            </div>
          </div>
          <button className="border bg-black text-white rounded-lg w-full py-2 font-light text-xs uppercase">
            Buy
          </button>
          <a
            href="https://paypal.com"
            className="text-sm text-center flex justify-center"
          >
            Or Pay with paypal
          </a>
        </div>
        <div>
          <hr className="border-[0,5px] border-black my-4 w-full h-px hidden md:block" />
          <label htmlFor="code" className="block text-sm font-medium mb-1">
            Promo code
          </label>
          <div className="flex gap-4">
            <input
              id="code"
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border rounded-lg px-3 py-1 flex-1 focus:outline-none focus:ring-1 focus:ring-black text-sm"
            />
            <button className="bg-black text-white border-black px-3 py-1 rounded-lg text-sm font-light">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
