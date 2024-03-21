'use server'
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { MyResponse } from "../api/products/route";
import { ObjectId } from "mongodb";

export const handleAddWishlist = async (productId: ObjectId) => {
    'use server'
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({ productId }),
    });
    const responseJson: MyResponse<unknown> = await response.json();
  
    if (!response.ok) {
      if (responseJson.error === "Unauthorized")
        redirect("/login?error=Please Login First");
      redirect(`/products?error=${responseJson.message}`);
    }
    revalidatePath("/wishlist");
    redirect("/wishlist");
  };