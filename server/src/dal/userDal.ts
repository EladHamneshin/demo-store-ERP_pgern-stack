import query from "../utils/qearyDB";
import User from "../types/User";

export const addUser = async (user: User) => {
  const {email, password} = user;
  const insert = await query(`
  insert into users (email, password)
  values('${email}', '${password}')
  RETURNING *
  `);
  const result = insert?.rows[0];
  console.log(insert);
  
  return result;
}

export const getUser = async (userId: string) => {
  const getUser = await query(`
  select * from users
  where id = '${userId}'
  `);
  return getUser?.rows[0];
}

export const getUserByEmail = async (email: string) => {
  const getUser = await query(`
  select * from users
  where email = '${email}'
  `);
  return getUser?.rows[0];
}
