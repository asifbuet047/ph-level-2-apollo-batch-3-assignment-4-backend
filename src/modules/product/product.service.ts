import { deleteModel } from "mongoose";
import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  const result = (await ProductModel.create(product)).toJSON();
  return result;
};

const getProductFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId, { _v: false }).lean();
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  const refinedResult = result.map((product) => {
    const simple = product.toJSON();
    const { __v, ...data } = simple;
    return data;
  });
  return refinedResult;
};

const updateProductIntoDB = async (
  productId: string,
  updatedInfo: Partial<TProduct>
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, updatedInfo, {
    new: true,
  }).lean();
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId, {
    new: true,
  }).lean();
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getProductFromDB,
  getAllProductsFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
