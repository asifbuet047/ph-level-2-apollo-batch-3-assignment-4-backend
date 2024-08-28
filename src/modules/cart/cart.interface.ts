import { ObjectId } from "mongoose";

export interface TCart {
  client_secret: string | null;
  client_name: string;
  client_phone_number: string;
  client_country: String;
  payment_status: "paid" | "cod";
  product_id: ObjectId;
  product_name: string;
  product_quantity: number;
  product_price: number;
}
