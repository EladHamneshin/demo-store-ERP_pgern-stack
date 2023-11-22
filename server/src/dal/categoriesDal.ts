import query from "../utils/qearyDB";

const getCategories = async () => {
  const sql = `
  SELECT * FROM categories
  `;
  const { rows } = await query(sql);
  return rows;
};

export default {getCategories}