import dal from '../dal/categoriesDal'
import RequestError from '../types/errors/RequestError';
import STATUS_CODES from '../utils/StatusCodes';

const getCategories = async () => {
  const categories = await dal.getCategories();  
  if (!categories) {
    throw new RequestError('No Categories found', STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
  return categories;
};

export default { getCategories };