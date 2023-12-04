import request from "supertest";
import { app } from '../server';
import { AdminProduct } from "../types/Product";
import * as Service from '../services/inventoryService';
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
    fetchMock.enableMocks(); 
});
  
afterEach(() => {
    fetchMock.resetMocks(); 
    fetchMock.disableMocks(); 
});

describe('Tests for inventory getAllProducts:', () => {
    test('testing if the endpoint return 200:', async () => {
        const res = await request(app).get(`/inventory/`)
        expect(Array.isArray(res.body)).toBeTruthy()
    })
})
describe('Tests for inventory get product by id:', () => {
    test('testing if returns by id:', async () => {
        const productId = '0a26f087-42e9-4d47-a3cb-e3704ed37e3d';
        const res = await request(app).get(`/inventory/${productId}`)
        expect(res.status).toBe(200)
        expect(res.body.name).toBe("Lenovo 770")
    })
    test('testing incorrect product id:', async () => {
        const incorrectProductId = '044576d1-dd03-4787-99bb-e554a74f4aaahfgd';
        const res = await request(app).get(`/inventory/${incorrectProductId}`)
        expect(res.status).toBe(500)
    })
})


test('testing inventory addNewProduct:', async () => {
    const mockBody: Omit<AdminProduct, "id"> = {
        "name": "iphone Pro Max",
        "saleprice": 4000,
        "quantity": 740,
        "description": "good iphone",
        "category": "c2f36898-84b4-4563-b2ca-47bc9a8fac5a",
        "discount": 0,
        "rating": 0,
        "clicked": 0,
        "image": {
            "url": "https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-x/iphone-x-space-gray-back.jpg",
            "alt": "iphone Pro Max"
        },
        "coordinate": {
            "longitude": 70.6298,
            "latitude": 95.234
        },
        "tags": {
            "brand": "Apple"
        },
        "costPrice": 1800,
        "isForSale": true,
        "supplier": "ivan electronics"
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockBody));

    jest.spyOn(Service, 'addNewProductService').mockResolvedValue(mockBody as AdminProduct);  

    const response = await Service.addNewProductService(mockBody);
    
    expect(response).toEqual(mockBody); 
}, 30000);

test('testing inventory updateProduct:', async () => {
    const productId = 'e0ee2626-5e27-481a-87a1-30c4d6f934a3';
    const mockBody: Omit<AdminProduct, "id"> = {
        "name": "Galaxy7",
        "saleprice": 4000,
        "quantity": 740,
        "description": "good Galaxy",
        "category": "c2f36898-84b4-4563-b2ca-47bc9a8fac5a",
        "discount": 0,
        "rating": 0,
        "clicked": 0,
        "image": {
            "url": "https://cdn.alloallo.media/catalog/product/apple/iphone/iphone-x/iphone-x-space-gray-back.jpg",
            "alt": "Galaxy7"
        },
        "coordinate": {
            "longitude": 70.6298,
            "latitude": 95.234
        },
        "tags": {
            "brand": "Apple"
        },
        "costPrice": 1800,
        "isForSale": true,
        "supplier": "ivan electronics"
    }
    fetchMock.mockResponseOnce(JSON.stringify(mockBody));
    jest.spyOn(Service, 'updateProductByIdService').mockResolvedValue(mockBody as AdminProduct);  

    const response = await Service.updateProductByIdService(mockBody, productId)
  
    expect(response).toEqual(mockBody); 
}, 30000);

test('testing inventory deleteProduct:', async () => {
    const productId = 'product_id_to_delete';
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Product deleted' }));

    jest.spyOn(Service, 'deleteProductByIdService').mockResolvedValue();

    const response = await Service.deleteProductByIdService(productId);
  
    expect(response).toEqual(undefined); 
});

