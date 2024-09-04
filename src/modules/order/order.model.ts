import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const OrderSchema = new Schema<TOrder>({
  client_secret: {
    type: Schema.Types.String,
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
  products_id: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  products_name: {
    type: [Schema.Types.String],
    required: true,
  },
  products_price: {
    type: [Schema.Types.Number],
    required: true,
  },
  products_quantity: {
    type: [Schema.Types.Number],
    required: true,
  },
});

export const OrderModel = model("order", OrderSchema);
