import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  thumbnail: string;
  price: number;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProductModelCreateInput = Omit<ProductModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME || "test";
const COLLECTION_PRODUCT = "Products";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getProducts = async () => {
  const db = await getDb();

  const products = (await db.collection(COLLECTION_PRODUCT).find().toArray()) as ProductModel[];

  return products;
};

export const getProductsBySlug = async (slug: string) => {
  const db = await getDb();

  const products = (await db.collection(COLLECTION_PRODUCT).findOne({
    slug,
  })) as ProductModel;

  return products;
};

export const getProductsById = async (Id: string) => {
  const db = await getDb();

  const products = (await db.collection(COLLECTION_PRODUCT).findOne({
    _id: new ObjectId(Id),
  })) as ProductModel;

  return products;
};

export const paginationProducts = async (limit: number) => {
  const db = await getDb();

  if (!limit) {
    limit = 10;
  }
  const productsLimit = (await db.collection(COLLECTION_PRODUCT).find().limit(limit).toArray()) as ProductModel[];
  return productsLimit;
};

// export const createPost = async (post: ProductModelCreateInput) => {
//     const newPost: ProductModelCreateInput = {
//       ...post,
//       createdAt: (new Date().toISOString()),
//       updatedAt: (new Date()).toISOString(),
//       slug: `${(post.name).toLowerCase().replaceAll(' ','-')}-${(new Date()).toISOString()}`
//     };

//     const db = await getDb();
//     const result = await db.collection(COLLECTION_PRODUCT).insertOne(newPost);

//     return result;
//   };
