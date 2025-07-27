import { createContext, useContext } from "react";
import { useCartReducer } from "./use-cart-reducer";

type CartType = {
  items: number;
  reducer: ReturnType<typeof useCartReducer>;
};

export const CartContext = createContext<undefined | CartType>(undefined);

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) throw new Error("Cart Context Not Defined");
  return context;
}
