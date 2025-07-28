import { NavLink, Link } from "@remix-run/react";
import { useCartContext } from "~/hooks/use-cart-context";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

type Navigation = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: Navigation[] = [
  {
    name: "Products",
    href: "/products",
    current: false,
  },
];

export default function Navbar() {
  const { reducer } = useCartContext();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full flex justify-between bg-white p-4 dark:bg-black border dark:text-white z-10">
      <button
        className="sm:hidden z-20"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? (
          <XMarkIcon className="size-6" />
        ) : (
          <Bars3Icon className="size-6" />
        )}
      </button>
      <h1 className="uppercase font-bold text-nowrap">The Online Store</h1>
      <ul
        className={`fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 bg-white sm:flex-row sm:static flex justify-center items-center gap-4 sm:gap-4 sm:flex ${
          open ? "flex" : "hidden"
        } sm:flex`}
      >
        {navigation.map((nav, index) => (
          <li key={index}>
            <NavLink
              to={nav.href}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              onClick={() => setOpen(false)}
            >
              {nav.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Link to="/cart" className="relative">
        <ShoppingCartIcon className="size-6" />
        {reducer.state.length !== 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white text-xs px-2 py-0.5">
            {reducer.state.length}
          </span>
        )}
      </Link>
    </nav>
  );
}
