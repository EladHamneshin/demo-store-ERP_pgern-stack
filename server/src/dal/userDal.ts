// import UserModel from "../models/userModel.ts";
import User from "../types/User";

export const addUser = async (user: User) => {
  // return await UserModel.create(user);
  return { _id: 'dcs7c9sc76sdcsd7sdc', email: 'mail@deff.com', password: '64gf7ed7ehc7e' }
}

export const getUser = async (userId: string) => {
  // return await UserModel.findById(userId);
  return { _id: 'dcs7c9sc76sdcsd7sdc', email: 'mail@.com', password: '64gf7ed7ehc7e' }
}

export const getUserByEmail = async (email: string) => {
  // return await UserModel.findOne({email})
  return { _id: 'dcs7c9sc76sdcsd7sdc', email: 'mail@.com', password: '64gf7ed7ehc7e' }
}
