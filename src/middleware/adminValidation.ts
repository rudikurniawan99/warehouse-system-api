import { Request, Response, NextFunction } from "express";
import { AccessTokenPayload } from "../interfaces/user.interface";
import { jwtVerify } from "../utils/jwt";

const accessTokenPrivateKey = String(process.env.ACCESS_TOKEN_PRIVATE_KEY)

const ownerAdminValidation = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  try {
    if(!accessToken) return res.sendStatus(401)
    const decoded  = await jwtVerify<AccessTokenPayload>(accessToken, accessTokenPrivateKey)
    if(decoded?.adminStatus === 'OWNER') next()
  } catch (error) {
    return res.sendStatus(402) 
  } 
}

const adminValidation = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  try {
    if(!accessToken) return res.sendStatus(401)
    const decoded = await jwtVerify<AccessTokenPayload>(accessToken, accessTokenPrivateKey) 
    if(decoded?.adminStatus === 'ADMIN' || decoded?.adminStatus === 'OWNER') next()
  } catch (error) {
    return res.sendStatus(402) 
  }
}

export { ownerAdminValidation, adminValidation }
