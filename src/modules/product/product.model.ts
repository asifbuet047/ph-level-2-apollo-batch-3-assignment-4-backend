import mongoose, { Schema, SchemaType } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>({
  name: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    unique: true,
  },
  category: {
    type: Schema.Types.String,
  },
  brand: {
    type: Schema.Types.String,
  },
  quantity: {
    type: Schema.Types.Number,
  },
  rating: {
    type: Schema.Types.Number,
  },
  price: {
    type: Schema.Types.Number,
  },
  product_image_url: {
    type: Schema.Types.String,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

export default ProductModel;
