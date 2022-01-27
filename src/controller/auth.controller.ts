import { Request, Response } from "express";

export const registerUserHandler = (req: Request, res: Response) => {
  const { body } = req
  console.log(body)

  // res.status(201)
}