import query from '../utils/queryDB';
import User from '../types/User';

export const addUser = async (user: User) => {
  const { email, password } = user;
  const insert = await query(`SELECT * FROM add_user('${email}', '${password}');`);
  const result = insert?.rows[0];
  console.log(insert);

  return result;
};

export const getUser = async (userId: string) => {
  const getUser = await query(`
  SELECT * FROM get_user('${userId}'::UUID);
  `);
  return getUser?.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const getUser = await query(`SELECT * FROM get_user_by_email('${email}');`);
  return getUser?.rows[0];
};
