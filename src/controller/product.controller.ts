import { Request, Response } from "express";
import { AccessTokenPayload } from "../interfaces/user.interface";
import { ProductInput } from "../models/product.model";
import { createProduct, findProductById } from "../services/product.services";
import { jwtVerify } from "../utils/jwt";
import removeImage from "../utils/removeImage";

export const createProductHandler = async (req: Request<{}, {}, Omit<ProductInput, 'photo'>>, res: Response) => {
  const { body } = req
  
  const accessTokenPrivateKey = String(process.env.ACCESS_TOKEN_PRIVATE_KEY)
  try {
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.sendStatus(401)

    const accessToken = authHeader?.split(' ')[1]
    const decoded = await jwtVerify<AccessTokenPayload>(accessToken, accessTokenPrivateKey)
    if(!decoded) res.sendStatus(400)

    const product = await createProduct({
      adminId: decoded?._id,
      name: body.name,
      stock: body.stock,
      size: body.size
    })
    res.status(201).json({
      product
    })
  } catch (e) {
    res.sendStatus(400)
  }
}

export const uploadImage = async (req: Request<{id: string}>, res: Response) => {
  const path = req?.file?.path
  const { id } = req.params

  try {
    const product = await findProductById(id)  
    if(!product){
      removeImage(path as string)
      return res.status(400).json({
        message: 'product not exist'
      }) 
    }
    if(product.photo){
      removeImage(product.photo)
    }
    product.photo = path
    product.save()

    res.status(201).json({
      product
    })
  } catch (e) {
    res.sendStatus(404) 
  }
  
}