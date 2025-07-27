import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import Navbar from "./components/Navbar";
import { CartContext } from "./hooks/use-cart-context";
import { useCartReducer } from "./hooks/use-cart-reducer";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function clientLoader() {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

export default function App() {
  const cartData = useLoaderData<typeof clientLoader>();
  const cartReducer = useCartReducer(cartData);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartReducer.state));
  }, [cartReducer.state]);

  return (
    <CartContext.Provider value={{ items: 0, reducer: cartReducer }}>
      <div className="flex flex-col min-h-screen h-full">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </CartContext.Provider>
  );
}
