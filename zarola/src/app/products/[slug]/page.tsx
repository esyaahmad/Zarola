import { MyResponse } from "@/app/api/products/route";
import ButtonAddWishlist from "@/app/components/ButtonAddWishlist";
import { ProductModel } from "@/app/db/models/product";

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  
  const fetchProducts = async (slug: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${slug}`, {
      cache: "no-store"
      
    });
    const responseJson: MyResponse<ProductModel> = await response.json();

    if (!response.ok) {
      throw new Error("Something Wrong!, Contact Our Admin");
    }

    return responseJson;
  };

  const product = await fetchProducts(params.slug);

  // console.log(product?.data);

  const rupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <section className="mt-20 md:mt-6 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:aspect-h-2 lg:aspect-w-2 lg:rounded-lg overflow-hidden px-4 md:px-2">
            <img src={product.data?.images[0]} alt="" className="w-full h-full md:h-[90vh] object-cover object-center border border-primary rounded-lg" />
          </div>
          <div className="grid grid-cols-2 lg:grid lg:grid-cols-1 lg:gap-y-4 px-2 gap-2 md:gap-0 md:px-2">
            <div
              className="lg:aspect-h-2 lg:aspect-w-3 lg:overflow-hidden lg:rounded-lg "
            >
              <img src={product.data?.images[1]} className="w-full h-full md:h-[44vh] object-cover object-center border rounded-lg border-secondary p-4" />
              <img src={product.data?.images[2]} className="w-full h-full md:h-[44vh] object-cover object-center border rounded-lg border-secondary p-4" />
            </div>
            {/* ))} */}
          </div>

          {/* Product info */}
          <div className="p-4 lg:p-8 border">
            <h1 className="text-3xl font-semibold text-gray-900">{product.data?.name}</h1>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">{product.data?.excerpt}</h2>
              {/* <p className="mt-2 text-gray-700">{product.data?.excerpt}</p> */}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900">Details</h2>
              <p className="mt-2 text-gray-700 list-disc list-inside">{product.data?.description}</p>
            </div>
            

            <div className="mt-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Price</h2>
              <p className="mt-2 text-primary font-semibold text-lg">{rupiah(+(product.data?.price as number))}</p>
            </div>
            <div className="w-full">
              <ButtonAddWishlist prod ={product.data._id}/>
              {/* <button className="bg-gray-400 text-black py-2 px-4 mt-4 rounded-md hover:bg-gray-200 w-full">Add to Wishlist</button> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
