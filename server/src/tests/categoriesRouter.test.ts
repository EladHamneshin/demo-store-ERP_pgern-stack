import request from 'supertest';
import express from 'express';
import shopCategoriesRouter from '../routes/categoriesRouter'; 



  describe('GET /categories', () => {
    it('should return a list of categories', async () => {
      const response = await request(shopCategoriesRouter).get('/categories');
     
      expect(response.status).toBe(200);                                                                                                         
      
    //   expect(Array.isArray(response.body)).toBe(true);
    });

    
  });
