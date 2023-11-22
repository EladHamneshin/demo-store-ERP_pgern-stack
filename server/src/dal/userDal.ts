// import UserModel from "../models/userModel.ts";
import User from "../types/User";

const addUser = async (user: User) => {
  // return await UserModel.create(user);
  return { _id: 'dcs7c9sc76sdcsd7sdc', email: 'mail@.com', password: '64gf7ed7ehc7e' }
}

const getUser = async (userId: string) => {
  // return await UserModel.findById(userId);
  return { _id: 'dcs7c9sc76sdcsd7sdc', email: 'mail@.com', password: '64gf7ed7ehc7e' }
}

const getUserByEmail = async (email: string) => {
  // return await UserModel.findOne({email})
  return { _id: 'dcs7c9sc76sdcsd7sdc', email: 'mail@.com', password: '64gf7ed7ehc7e' }
}


export default { addUser, getUser, getUserByEmail };