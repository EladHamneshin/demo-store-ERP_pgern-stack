import userDal from "../dal/userDal";
import RequestError from "../types/errors/RequestError";
import STATUS_CODES from "../utils/StatusCodes";
import { comparePassword } from '../utils/encryptionUtils';

const authUser = async (email: string, password: string) => {
    const user = await userDal.getUserByEmail(email);
    

    if (!user)
        throw new RequestError('Invalid email', STATUS_CODES.UNAUTHORIZED);

    if (!await comparePassword(password, user.password))
        throw new RequestError('Invalid password', STATUS_CODES.UNAUTHORIZED);

    return user;
}

export default { authUser };