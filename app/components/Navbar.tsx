import { NavLink } from "@remix-run/react";

type Navigation = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: Navigation[] = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  {
    name: "Products",
    href: "/products",
    current: false,
  },
];

export default function Navbar() {
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
      <button>cart</button>
    </nav>
  );
}
