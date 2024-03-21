import { ProductModel, paginationProducts } from "@/app/db/models/product";
import { NextRequest, NextResponse } from "next/server";

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data: T;
  error?: string;
};

// const productInputSchema = z
// .object({
//   name:z.string(),
//   slug: z.string(),
//   description: z.string(),
//   excerpt: z.string().min(6),
//   price: z.number(),
//   thumbnail: z.string(),
//   images: z.string().array(),
//   tags: z.string().array(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
// });

export const GET = async (request: NextRequest) => {
  // console.log("x-user-id", request.headers.get("x-user-id"));
  // console.log("x-user-email", request.headers.get("x-user-email"));
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const limitNumber: number = Number(limit) as number;

  const products = await paginationProducts(limitNumber);

  return NextResponse.json<MyResponse<ProductModel[]>>(
    {
      statusCode: 200,
      message: "Pong from GET /api/posts !",
      data: products,
    },
    {
      status: 200,
    }
  );
};

// export const POST = async (request: Request) => {
//   try {
//     const data = await request.json();

//     const parsedData = productInputSchema.safeParse(data);

//     if (!parsedData.success) {
//       throw parsedData.error;
//     }

//     const user = await createPost(parsedData.data);

//     return NextResponse.json<MyResponse<unknown>>(
//       {
//         statusCode: 201,
//         message: "Pong from POST /api/post !",
//         data: user,
//       },
//       {
//         status: 201,
//       },
//     );
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       console.log(err);

//       const errPath = err.issues[0].path[0];
//       const errMessage = err.issues[0].message;

//       return NextResponse.json<MyResponse<never>>(
//         {
//           statusCode: 400,
//           error: `${errPath} - ${errMessage}`,
//         },
//         {
//           status: 400,
//         },
//       );
//     }

//     return NextResponse.json<MyResponse<never>>(
//       {
//         statusCode: 500,
//         message: "Internal Server Error !",
//       },
//       {
//         status: 500,
//       },
//     );
//   }
// };
