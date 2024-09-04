import { ObjectId } from "mongoose";

export interface TOrder {
  client_secret: string | null;
  client_name: string;
  client_phone_number: string;
  client_country: string;
  payment_status: "paid" | "cod";
  products_id: ObjectId[];
  products_name: string[];
  products_quantity: number[];
  products_price: number[];
}
