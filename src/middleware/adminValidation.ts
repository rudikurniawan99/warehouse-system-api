import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "../utils/jwt";

interface AccessTokenPayload {
  _id: string
  admin_status: 'OWNER' | 'ADMIN'
}

const accessTokenPrivateKey = String(process.env.ACCESS_TOKEN_PRIVATE_KEY)

const ownerAdminValidation = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  try {
    if(!accessToken) return res.sendStatus(401)
    const decoded  = await jwtVerify<AccessTokenPayload>(accessToken, accessTokenPrivateKey)
    if(decoded?.admin_status === 'OWNER') next()
  } catch (error) {
    return res.sendStatus(402) 
  } 
}

const commonAdminValidation = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  try {
    if(!accessToken) return res.sendStatus(401)
    const decoded = await jwtVerify<AccessTokenPayload>(accessToken, accessTokenPrivateKey) 
    if(decoded?.admin_status === 'ADMIN') next()
  } catch (error) {
    return res.sendStatus(402) 
  }
}

export { ownerAdminValidation, commonAdminValidation }
