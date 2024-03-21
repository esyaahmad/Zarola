'use client'
import { useEffect, useState } from "react";
import { ProductModel } from "../db/models/product";
import { MyResponse } from "../api/products/route";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../components/Footer";
import { handleAddWishlist } from "./action";
import ClientFlashComponent from "../components/ClientFlashComponent";


export default function Products() {
  // // const [product,setProduct] = useState<MyResponse<ProductModel[]>>([])
  const [product, setProduct] = useState<ProductModel[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(5);

  async function fetchProduct() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=${limit}`, {
      cache: "no-store",
    });
    const responseJson: MyResponse<ProductModel[]> = await response.json();

    if (!response.ok) {
      throw new Error("Something Wrong!, Contact Our Admin");
    }

    const data = responseJson.data as ProductModel[];
    if (data.length < 52) {
      setTimeout(() => {
        setLimit(limit + 5);
        setProduct(data);
      }, 200);
    } else {
      setHasMore(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  
  // console.log(product);
  if (product.length > 0) {
    return (
      <>
        <div>
          {/* <CardProduct/> */}
          <InfiniteScroll dataLength={product.length} next={fetchProduct} hasMore={hasMore} loader={<p>Loading...</p>}>
            <div className="mx-8">
              <ClientFlashComponent/>
              <h6 className="text-black text-xl font-light tracking-widest mt-12">Jumlah Produk : {product.length} </h6>
            </div>
            <div>
              <div className="grid grid-cols-5 justify-center m-8">
                {product?.map((prod) => (
                  <div key={prod.slug} className="relative flex flex-col text-gray-700 hover:bg-gray-100 bg-clip-border rounded-xl w-60 h-[500px] mx-8">
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-80">
                      <img src={prod.images[0]} alt="card-image" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-2">
                      <div className="flex items-center justify-between mb-2">
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">{prod.name}</p>
                        <button className="block py-2 px-3 text-white  md:border-0 md:hover:underline md:p-0">
                          <img src="love-black.png" className="size-6" alt="" onClick={() => handleAddWishlist(prod?._id)}/>
                        </button>
                      </div>
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">{prod.excerpt}</p>
                      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">{rupiah(+prod.price)}</p>
                    </div>
                    <div className="p-6 pt-0">
                      <Link href={`/products/${prod.slug}`}>
                        <button
                          className="align-middle select-none font-sans border border-black font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                          type="button"
                        >
                          Detail Product
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
               
              </div>
            </div>
          </InfiniteScroll>
        </div>

        {/* footer */}
       <Footer/>
      </>
    );
  }
}

