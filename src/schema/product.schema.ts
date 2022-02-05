import { number, object, string } from "zod";

export const createProductSchema = object({
  body: object({
    name: string({
      required_error: 'required name'
    }),
    stock: number().default(0),
    size: number().array().default([])
  })
})