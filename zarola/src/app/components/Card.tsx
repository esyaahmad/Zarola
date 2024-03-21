"use client";

import Link from "next/link";
import { ProductModel } from "../db/models/product";

const Card = ({ product }: { product: ProductModel }) => {
  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  return (
    <>
      <div key={(product?._id).toString()} className="relative flex flex-col text-gray-700 hover:bg-gray-100 bg-clip-border rounded-xl w-60 mx-8 h-[500px]">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80">
          <img src={product.images[0]} alt="card-image" className="object-cover w-full h-full" />
        </div>
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">{product.name}</p>
          </div>
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">{product.excerpt}</p>
          <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900"> {rupiah(+product.price)}</p>
        </div>
        <div className="p-6 pt-0">
          <Link href={`/products/${product.slug}`}>
            <button
              className="align-middle select-none font-sans border border-black font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              type="button"
            >
              Detail Product
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
