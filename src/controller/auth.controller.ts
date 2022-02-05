import { Request, Response } from "express";
import { AccessTokenPayload } from "../interfaces/user.interface";
import { UserInput } from "../models/user.model";
import { createUser, deleteAllUser, findUserByEmail, removeRefreshToken } from "../services/auth.services";
import { jwtSign, jwtVerify } from "../utils/jwt";

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
      return res.status(400).json({
        message: 'email tidak ditemukan'
      })
    } 

    const valid = await user?.verifyPassword(body.password)
    if(!valid){
      return res.status(400).json({
        message: 'password tidak sesuai dengan email ini'
      })
    }

    const accessTokenPrivateKey = String(process.env.ACCESS_TOKEN_PRIVATE_KEY)
    const refreshTokenPrivateKey = String(process.env.REFRESH_TOKEN_PRIVATE_KEY)

    const accessToken = jwtSign({ 
      _id: user._id,
      adminStatus: user.adminStatus
    }, accessTokenPrivateKey, {
      expiresIn: '1m'
    })

    const refreshToken = jwtSign({ 
      _id: user._id,
      adminStatus: user.adminStatus
    }, refreshTokenPrivateKey, {
      expiresIn: '30d'
    })

    user.refreshToken = refreshToken
    user.save()

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      accessToken,
    })

  } catch (e: any) {
    throw new Error(e);
  }
}

export const refreshAccessTokenHandler = async (req: Request, res: Response) => {
  const refreshTokenPrivateKey = String(process.env.REFRESH_TOKEN_PRIVATE_KEY)
  const accessTokenPrivateKey = String(process.env.ACCESS_TOKEN_PRIVATE_KEY)

  try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.status(401).json({
      message: `you're not logged in`
    })

    const user = await jwtVerify<AccessTokenPayload>(refreshToken, refreshTokenPrivateKey)
    if(!user){
      return res.status(401).json({
        message: `don't recognize user`
      })
    }

    const accessToken = jwtSign({ 
      _id: user?._id,
      adminStatus: user?.adminStatus
    }, accessTokenPrivateKey, {
      expiresIn: '1m'
    })
    res.status(200).json({
      accessToken
    })
  } catch (e: any) {
    throw new Error(e);
  }

}

export const logoutHandler = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  const refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY as string

  if(!refreshToken) return res.status(402).json({
    message: `you're not logged in`
  })

  const decoded = await jwtVerify<AccessTokenPayload>(refreshToken, refreshTokenPrivateKey)
  if(!decoded) return res.sendStatus(401)

  await removeRefreshToken(decoded?._id)
  res.clearCookie('refreshToken')

  return res.sendStatus(200)
}

export const deleteAllUserHandler =  async (req: Request, res: Response) => {
  const deletedItem =  await deleteAllUser()
  res.status(200).json({
    deletedItem,
    message: 'success to delete all user'
  })
}