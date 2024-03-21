import { deleteWishlistByProductId } from "@/app/db/models/wishlist";
import { NextResponse } from "next/server";


export type MyResponseMessage = {
  statusCode: number;
  message?: string;
  error?: string;
};
export const DELETE = async (request: Request, { params }: { params: { productId: string } }) => {
  try {
    const userId = request.headers.get("x-user-id") as string;

    if (!userId || !params.productId) throw new Error("Not Found");
    const response = await deleteWishlistByProductId(params.productId, userId);
    return NextResponse.json<MyResponseMessage>({
      statusCode: 200,
      message: response,
    });
  } catch (error) {
    return NextResponse.json<MyResponseMessage>(
      {
        statusCode: 500,
        message: "Internal Server Error !",
      },
      {
        status: 500,
      }
    );
  }
};
