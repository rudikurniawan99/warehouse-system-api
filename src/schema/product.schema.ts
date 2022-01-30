import { number, object, string } from "zod";

export const createProductSchema = object({
  body: object({
    adminId: string({
      required_error: 'required adminId'
    }),
    name: string({
      required_error: 'required name'
    }),
    stock: number().default(0),
    size: number().array().default([])
  })
})