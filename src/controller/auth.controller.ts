import { Request, Response } from "express";
import { UserInput } from "../models/user.model";
import { createUser } from "../services/auth.services";

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