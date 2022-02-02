import { Request, Response, NextFunction } from 'express'

const refreshTokenValidate = ( req: Request, res: Response, next: NextFunction ) => {
  try {
    req.cookies.refreshToken 
    next()
  } catch (error) {
    return res.sendStatus(401) 
  }
}

export default refreshTokenValidate