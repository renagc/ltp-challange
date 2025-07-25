import { type Product } from "~/types/product";
import { useLoaderData, Link } from "@remix-run/react";

export async function loader() {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) return null;
  const data = await response.json();
  return data.products;
}

export default function Products() {
  const products = useLoaderData<Product[]>();

  return (
    <section className="p-4 space-y-4 mx-auto max-w-screen-2xl">
      <h2 className="font-bold">Product List</h2>
      <div>Filters</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product, index: number) => (
          <Link
            key={index}
            to={`/products/${product.id}`}
            className="flex flex-col aspect-square gap-3"
          >
            <div className="h-full grid place-items-center bg-gray-200">
              <img
                className="aspect-square w-2/3"
                src={product.images[0]}
                alt={product.title}
              />
            </div>
            <div className="text-xs font-light">
              <div className="flex justify-between items-center">
                <h3 className="uppercase">{product.title}</h3>
                <span
                  className={`w-2 h-2 rounded-full mr-1 ${
                    product.availabilityStatus === "In Stock"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                  title={
                    product.availabilityStatus === "In Stock"
                      ? "In stock"
                      : "Low Stock"
                  }
                ></span>
              </div>
              <p>{product.price} €</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
