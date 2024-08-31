import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  client_secret: {
    type: Schema.Types.String,
    required: true,
  },
  client_name: {
    type: Schema.Types.String,
    required: true,
  },
  client_phone_number: {
    type: Schema.Types.String,
    required: true,
  },
  client_country: {
    type: Schema.Types.String,
    required: true,
  },
  payment_status: {
    type: Schema.Types.String,
    required: true,
  },
  product_id: {
    type: Schema.Types.ObjectId,
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
  product_quantity: {
    type: Schema.Types.Number,
    required: true,
  },
});

export const OrderModel = model("order", OrderSchema);
