import mongoose, { Schema, SchemaType } from "mongoose";
import { TDiscount } from "./discount.interface";

const DiscountSchema = new Schema<TDiscount>({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  product_name: {
    type: Schema.Types.String,
    required: true,
  },
  product_price: {
    type: Schema.Types.Number,
    required: true,
  },
  product_discount: {
    type: Schema.Types.Number,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const DiscountModel = mongoose.model("discount", DiscountSchema);
