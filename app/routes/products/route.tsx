import { type Product } from "~/types/product";
import { useLoaderData, Link } from "@remix-run/react";
import { ChangeEvent, useState } from "react";
import { Pagination } from "./pagination";

export async function loader() {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) return null;
  const data = await response.json();
  return data.products;
}

export default function Products() {
  const products = useLoaderData<Product[]>();
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const pageSize = 10;
  const totalPages = products.length / pageSize;
  const [page, setPage] = useState<number>(0);

  console.log(products.length);

  const sorting = (a: Product, b: Product) => {
    switch (sortField) {
      case "t-asc":
        return a.title.localeCompare(b.title);
      case "t-desc":
        return b.title.localeCompare(a.title);
      case "p-asc":
        return a.price - b.price;
      case "p-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  };

  return (
    <section className="pt-20 p-4 space-y-4 mx-auto max-w-screen-2xl">
      <h2 className="font-bold">Product List</h2>
      <select
        value={sortField}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSortField(e.target.value)
        }
        className="border px-3 py-1 bg-white rounded-lg font-light text-sm"
      >
        <option value="undefined">None</option>
        <option value="t-asc">Title ▲</option>
        <option value="t-desc">Title ▼</option>
        <option value="p-asc">Price ▲</option>
        <option value="p-desc">Price ▼</option>
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products
          .sort(sorting)
          .slice(page * pageSize, pageSize * (page + 1))
          .map((product: Product, index: number) => (
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
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </section>
  );
}
