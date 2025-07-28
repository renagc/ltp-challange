import { type ImgHTMLAttributes } from "react";

export function ProductImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <div className="max-h-screen h-full w-full bg-gray-200 aspect-square grid place-items-center">
      <img alt="" className="w-2/3" {...props} />
    </div>
  );
}
