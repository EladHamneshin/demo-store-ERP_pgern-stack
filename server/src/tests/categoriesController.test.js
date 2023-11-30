import categoryService from '../services/categoriesService'; 
import  request  from 'supertest';

describe('Category Service Tests', () => {

  it('should retrieve categories from the database', async () => {
    const categories = await categoryService.getCategories();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories[0]).toHaveProperty('id');
    expect(categories[0]).toHaveProperty('name');
  });


});
