import { useReducer } from "react";
import { Product } from "~/types/product";

type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

type Action =
  | {
      type: string;
      payload: Product;
    }
  | { type: "CLEAR" };

export const cartReducer = (state: CartItem[], action: Action) => {
  switch (action.type) {
    case "ADD":
      if (state.find((product) => product.id === action.payload.id)) {
        return state.map((cartItem) =>
          cartItem.id !== action.payload.id
            ? cartItem
            : { ...cartItem, quantity: cartItem.quantity + 1 }
        );
      }
      return [
        ...state,
        {
          id: action.payload.id,
          product: action.payload,
          quantity: 1,
        },
      ];
    case "DECREMENT":
      return state
        .map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0);
    case "REMOVE":
      return state.filter((cartItem) => cartItem.id !== action.payload.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
};

export function useCartReducer(initialCart: CartItem[] = []) {
  const [state, dispatch] = useReducer(cartReducer, initialCart);

  return {
    state,
    addProduct: (product: Product) =>
      dispatch({ type: "ADD", payload: product }),
    decrementProduct: (product: Product) =>
      dispatch({ type: "DECREMENT", payload: product }),
    removeProduct: (product: Product) =>
      dispatch({ type: "REMOVE", payload: product }),
    clearCart: () => dispatch({ type: "CLEAR" }),
  };
}
