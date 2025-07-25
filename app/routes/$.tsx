import { Link } from "@remix-run/react";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-full bg-red-500">
      404 Not Found
      <Link to="/">Back Home</Link>
    </div>
  );
}
