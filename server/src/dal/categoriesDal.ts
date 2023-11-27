import query from '../utils/queryDB';

const getCategories = async () => {
  const sql = `
  SELECT * FROM categories
  `;
  const { rows } = await query(sql);
  return rows;
};

export default { getCategories };
