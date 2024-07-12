import { model, Schema } from "mongoose";

export interface TProduct {
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  rating: number;
  price: number;
  product_image_url: string;
}
