import { NavLink, Link } from "@remix-run/react";
import { useCartContext } from "~/hooks/use-cart-context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

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
  return (
    <nav className="fixed w-full flex justify-between bg-white p-4 dark:bg-black border dark:text-white">
      <h1 className="uppercase font-bold">The Online Store</h1>
      <ul className="flex gap-4">
        {navigation.map((nav, index) => (
          <li key={index}>
            <NavLink
              to={nav.href}
              className={({ isActive }) => (isActive ? "font-bold" : "")}
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
