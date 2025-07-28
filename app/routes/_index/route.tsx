import type { MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ecommerce App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  return redirect("/products");
}

export default function Index() {
  return null;
}
