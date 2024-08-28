import ProductModel from "../product/product.model";
import { TCart } from "./cart.interface";
import { CartModel } from "./cart.model";

const createCartIntoDB = async (cart: TCart) => {
  const result = (await CartModel.create(cart)).toJSON();
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

const getAllCartsFromDB = async () => {
  const result = await CartModel.find({ _v: false });
  const refinedResult = result.map((cart) => {
    const simple = cart.toJSON();
    return simple;
  });
  return refinedResult;
};

const getAllCartsOfAnUserFromDB = async (phone: string) => {
  const result = await CartModel.find(
    { client_phone_number: phone },
    { _v: false }
  ).lean();
  return result;
};

export const CartServices = {
  createCartIntoDB,
  getAllCartsFromDB,
  getAllCartsOfAnUserFromDB,
};
