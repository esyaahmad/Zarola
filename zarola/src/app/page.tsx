import { MyResponse } from "./api/products/route";
import Card from "./components/Card";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

import { ProductModel } from "./db/models/product";
import Link from "next/link";
import NavbarAfterLogin from "./components/NavbarAfterLogin";
import { cookies } from "next/headers";

const fetchProducts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store"
  });
  const responseJson: MyResponse<ProductModel[]> = await response.json();

  if (!response.ok) {
    throw new Error("Something Wrong!, Contact Our Admin");
  }

  return responseJson;
};
export default async function Home() {
  const products = await fetchProducts();
  return (
    <>
      {/* navbar */}
      <nav className=" bg-white border-b">
        <NavbarAfterLogin />
      </nav>
      {/* end of navbar */}

      <div>
        {/* banner */}
        <div className=" w-4/5 mx-auto mt-8 ">
          <Hero />
        </div>
        {/* card */}
        <div className="grid grid-cols-5 justify-center m-8">
          {products.data?.splice(0, 5).map((prod) => (
            <Card product={prod} key={prod.slug} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link href={"/products"}>
            <button className="m-4 border hover:bg-gray-50 text-black font-light py-2 px-4 rounded-full">See All</button>
          </Link>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </>
  );
}
