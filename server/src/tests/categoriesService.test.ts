import categoryService from '../services/categoriesService'; 
import STATUS_CODES from '../utils/StatusCodes';

describe('Category Service Tests', () => {

  it('should retrieve categories from the database', async () => {
    try {
      const categories = await categoryService.getCategories();

      expect(Array.isArray(categories)).toBe(true);
      
      if (categories.length > 0) {
        expect(categories[0]).toHaveProperty('id');
        expect(categories[0]).toHaveProperty('name');
      }
    } catch (error) {
      expect(error).toHaveProperty('message', 'No Categories found');
      expect(error).toHaveProperty('statusCode', STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  });
});
