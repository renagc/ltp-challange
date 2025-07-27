import {
  useLoaderData,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { type Product } from "~/types/product";
import { useCartContext } from "~/hooks/use-cart-context";
import { ProductImage } from "~/components/ProductImage";

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) throw new Response("Not Found", { status: 404 });
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok)
    throw new Response("Failed to fetch product", { status: 500 });
  const product: Product = await response.json();
  return product;
}

export default function ProductDetail() {
  const product = useLoaderData<Product>();
  const { reducer } = useCartContext();

  return (
    <div className="p-4">
      <div className="space-y-4 md:flex gap-4">
        <ProductImage src={product.images[0]} alt={product.title} />
        <div className="block md:hidden space-y-4">
          <h3 className="text-sm uppercase">Product Details</h3>
          <p className="text-sm normal-case">{product.description}</p>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 w-full md:max-w-lg md:static flex flex-col gap-2 md:justify-center md:gap-12 uppercase font-light">
          <div className="space-y-2 md:space-y-12">
            <div className="space-y-2">
              <h1 className="text-sm md:text-xl">{product.title}</h1>
              <h2 className="text-sm md:text-xl">{product.price} €</h2>
            </div>
            <hr className="border-[0,5px] border-black my-4 w-full h-px hidden md:block" />
            <button
              className="border border-black w-full py-2 font-light text-xs uppercase"
              onClick={() => reducer.addProduct(product)}
            >
              add
            </button>
          </div>
          <div className="hidden md:block">
            <h3 className="text-sm mb-2">Product Details</h3>
            <p className="text-sm normal-case">{product.description}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {product.images.slice(1).map((image, index) => (
          <ProductImage key={index} src={image} alt={product.title} />
        ))}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="h-full grid place-items-center">product not found</div>
    );
  }
}
