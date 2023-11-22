import User from "../types/User";
import userDal from "../dal/userDal";
import STATUS_CODES from "../utils/StatusCodes";
import RequestError from "../types/errors/RequestError";
import { hashPassword } from "../utils/encryptionUtils";

const addUser = async (user: User) => {
	const { email, password } = user;
	const isUserRegistered  = await userDal.getUserByEmail(email);

	if (isUserRegistered) 
		throw new RequestError('Email already exists', STATUS_CODES.BAD_REQUEST);

	const hashedPassword = await hashPassword(password);
	const newUser = await userDal.addUser({ email, password: hashedPassword });
	console.log(newUser._id);
	return newUser;
}

const getUser = async (userId: string) => {
	const user = await userDal.getUser(userId);
	if(!user)
		throw new RequestError('User not found', STATUS_CODES.NOT_FOUND);
	return user;
}

export default { addUser, getUser };