import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ecommerce App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return <p>Home Page</p>;
}
