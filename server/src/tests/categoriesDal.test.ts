import categoriesDal from '../dal/categoriesDal';



// import { describe, it } from "node:test"
// import {expect, describe, it} from "@jest/globals"

describe('categoriesDal Integration Tests', () => {

  it('should retrieve categories from the database', async () => {
    // Call the function
    const categories = await categoriesDal.getCategories();

    // assertions
    expect(Array.isArray(categories)).toBe(true);

  });
  // Add more 
});
