import { model, ObjectId, Schema } from "mongoose";

export interface TDiscount {
  title: string;
  product_name: string;
  product_price: number;
  product_discount: number;
  productId: ObjectId;
}
