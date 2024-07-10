import mongoose, { Schema, SchemaType } from "mongoose";
import { TProduct } from "./product.interface";

const ProductSchema = new Schema<TProduct>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  brand: {
    type: Schema.Types.String,
    required: true,
  },
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  rating: {
    type: Schema.Types.Number,
    required: true,
  },
});

const ProductModel = mongoose.model("product", ProductSchema);

export default ProductModel;
