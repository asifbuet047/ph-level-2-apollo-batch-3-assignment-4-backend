import ProductModel from "../product/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDB = async (cart: TOrder) => {
  const result = (await OrderModel.create(cart)).toJSON();
  if (result) {
    const product = await ProductModel.findById(cart.product_id).lean();
    if (product) {
      const inventory = product.quantity - cart.product_quantity;
      const updateProduct = await ProductModel.findByIdAndUpdate(
        cart.product_id,
        { quantity: inventory },
        { new: true }
      );
      return updateProduct;
    }
  }
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find({ _v: false });
  const refinedResult = result.map((cart) => {
    const simple = cart.toJSON();
    return simple;
  });
  return refinedResult;
};

const getAllOrdersOfAnUserFromDB = async (phone: string) => {
  const result = await OrderModel.find(
    { client_phone_number: phone },
    { _v: false }
  ).lean();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getAllOrdersOfAnUserFromDB,
};
