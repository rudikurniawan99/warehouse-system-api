import ProductModel, { ProductInput } from '../models/product.model'

export const createProduct = async (body: ProductInput) => {
  try {
    return await ProductModel.create(body)
  } catch (e:any) {
    throw new Error(e);
  } 
}