import UserModel, { UserInput } from "../models/user.model";

export const createUser = async (body: UserInput) => {
  try {
    return await UserModel.create(body)
  } catch (e: any) {
    throw new Error(e)
  }
}