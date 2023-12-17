import User from "../types/User";
import * as userDal from "../dal/userDal";
import STATUS_CODES from "../utils/StatusCodes";
import RequestError from "../types/errors/RequestError";
import { hashPassword, comparePassword } from "../utils/encryptionUtils";
import generateToken from "../utils/jwtUtils";

const createUser = async (user: User) => {
	const {email, password} = user;
	const isUserRegistered  = await userDal.getUserByEmail(email);

	if (isUserRegistered) 
		throw new RequestError('Email already exists', STATUS_CODES.BAD_REQUEST);

	const hashedPassword = await hashPassword(password);
	const newUser = await userDal.createUser({ email, password: hashedPassword });

  const token_a = generateToken(newUser.id);

  return {
    id: newUser.id,
    email: newUser.email,
    token: token_a
  };
}

const updateUser = async (user: User) => {
  const {email, password} = user;
	const isUserRegistered  = await userDal.getUserByEmail(email);

	if (!isUserRegistered) 
		throw new RequestError('Email dosen\'t exists', STATUS_CODES.BAD_REQUEST);
  const comporePassword = await comparePassword(password, isUserRegistered.password);
  if (!comporePassword) throw new RequestError('Wrong password', STATUS_CODES.BAD_REQUEST);
  const hashedPassword = await hashPassword(password);
  const updateUser = await userDal.updateUser({ email, password: hashedPassword })
  const token_a = generateToken(updateUser.id);

  return {
    id: updateUser.id,
    email: updateUser.email,
    token: token_a
  };
}

const deleteUser = async (user: User) => {
  const {email, password} = user;
	const isUserRegistered  = await userDal.getUserByEmail(email);
  if (!isUserRegistered) {
		throw new RequestError('Email dosen\'t exists', STATUS_CODES.BAD_REQUEST);
  }
  const comporePassword = await comparePassword(password, isUserRegistered.password);
  if (!comporePassword) throw new RequestError('Wrong password', STATUS_CODES.BAD_REQUEST);
  const deleteUser = await userDal.deleteUser(email);
  return deleteUser;
}

const getUser = async (userId: string) => {
	const user = await userDal.getUser(userId);
	if(!user)
		throw new RequestError('User not found', STATUS_CODES.NOT_FOUND);
	return user;
}

export default {createUser, getUser, updateUser, deleteUser}
