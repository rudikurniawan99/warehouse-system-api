import { Request, Response } from "express";
import { UserInput } from "../models/user.model";
import { createUser, findUserByEmail } from "../services/auth.services";

export const registerUserHandler = async (req: Request<{}, {}, UserInput>, res: Response) => {
  const { body } = req
  try {
    const user = await createUser(body)
    res.status(201).json({
      data: user
    })
  } catch (e) {
    res.sendStatus(400) 
  }
}

export const loginUserHandler = async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
  const { body } = req

  try {
    const user = await findUserByEmail(body.email)
    if(!user){
      res.status(400).json({
        message: 'email tidak ditemukan'
      })
    } 

    const valid = await user?.verifyPassword(body.password)
    if(!valid){
      res.status(400).json({
        message: 'password tidak sesuai dengan email ini'
      })
    }
    res.status(200).json({
      data: user
    })

  } catch (e: any) {
    throw new Error(e);
  }
}