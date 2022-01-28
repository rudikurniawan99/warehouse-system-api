import jwt, { SignOptions } from 'jsonwebtoken'

export const jwtSign = (payload: object, secret: string, options: SignOptions) => {
  return jwt.sign(payload, secret, {
    ...(options && options)
  })
}

export const jwtVerify = <T>(token: string, secret: string): T | null => {
  try {
    return jwt.verify(token, secret) as T
  } catch (e) {
    return null 
  }
}
