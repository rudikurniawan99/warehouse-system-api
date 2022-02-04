import UserModel, { UserInput } from "../models/user.model";

export const createUser = async (body: UserInput) => {
  try {
    return await UserModel.create(body)
  } catch (e: any) {
    throw new Error(e)
  }
}

export const findUserByEmail = async (email: string) => {
  try {
    return await UserModel.findOne({ email }) 
  } catch (e: any) {
    throw new Error(e)
  }
}

export const deleteAllUser = async () => {
  try {
    return await UserModel.deleteMany() 
  } catch (e: any) {
    throw new Error(e) 
  }
}