import mongoose, { Document } from 'mongoose'
import argon from 'argon2'

export interface UserInput {
  name: string
  email: string
  password: string
  admin_status: 'OWNER' | 'ADMIN'
}

export interface UserDocument extends UserInput, Document {
  createdAt: Date
  updatedAt: Date
  verifyPassword: (passwordInput: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin_status: {
    type: String,
    required: true,
    default: 'ADMIN'
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next){
  let user = this as UserDocument
  if(!user.isModified('password')){
    next()
  }
  const hashPassword = await argon.hash(user.password)
  user.password = hashPassword
})

userSchema.methods.verifyPassword = async function(passwordInput: string): Promise<boolean>{
  let user = this as UserDocument
  try {
    return argon.verify(user.password, passwordInput)
  } catch (e: any) {
    return false 
  }
}

export const User = mongoose.model<UserDocument>('User', userSchema)
export default User