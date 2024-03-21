import { getProductsBySlug } from "@/app/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { MyResponse } from "../route";

export const GET = async (_request: NextRequest, { params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const products = await getProductsBySlug(slug);

  return NextResponse.json<MyResponse<unknown>>(
    {
      statusCode: 200,
      message: "Pong from GET /api/products/slug !",
      data: products,
    },
    {
      status: 200,
    }
  );
};
