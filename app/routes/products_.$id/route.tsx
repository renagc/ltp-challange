import { useParams } from "@remix-run/react";

export default function ProductDetail() {
  const { id } = useParams();
  return <div>Product Detail {id}</div>;
}
