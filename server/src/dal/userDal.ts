import query from '../utils/queryDB';
import User from '../types/User';

export const createUser = async (user: User) => {
  try {
    const { email, password } = user;
    const insert = await query(`
      INSERT INTO users(email, password)
      VALUES ('${email}', '${password}')
      RETURNING id, email;
    `);

    const result = insert?.rows[0];
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};


export const updateUser = async (user: User) => {
  const { email, password } = user;

  try {
    const update = await query(`
      UPDATE users
      SET email = '${email}', password = '${password}'
      WHERE email = '${email}'
      RETURNING id, email;
    `);

    const result = update?.rows[0];
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user');
  }
};


export const deleteUser = async (email: string) => {
  try {
    const deleteResult = await query(`
      DELETE FROM users
      WHERE email = '${email}';
    `);
    if (!!deleteResult.rowCount) {
      return { massage: 'User deleted successfully' };
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
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
