import request from "supertest";
import * as Service from '../services/shopInventoryService';
import { app } from '../server'
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
    fetchMock.enableMocks(); 
});

afterEach(() => {
    fetchMock.resetMocks(); 
    fetchMock.disableMocks(); 
});


describe('tests for shopInventory controller getAllData: ', () => {
    test('testing if data is in array', async () => {
        const data = await Service.getAllData(undefined, undefined);
        expect(Array.isArray(data)).toBeTruthy()
    })
    test('tests searchParams:', async () => {
        const search = "Lenovo 770";
        const categories = undefined;
        const data = await Service.getAllData(search, categories);
        
        expect(data[0].id).toBe("0a26f087-42e9-4d47-a3cb-e3704ed37e3d")
        expect(data[0].name).toBe("Lenovo 770")
    })
    test('tests categoryParams:', async () => {
        const search = undefined;
        const categories = "Computers";
        const data = await Service.getAllData(search, categories);

        expect(data[0].category).toBe("Computers")
        expect(data[2].category).not.toBe("Phones")
    })
    test('tests incorrect searchParams returns noting:', async () => {
        const search = "Computers";
        const categories = undefined;
        const data = await Service.getAllData(search, categories);
        expect(data).toStrictEqual([])
    })
    test('tests incorrect categoriesParams returns noting:', async () => {
        const search = undefined;
        const categories = "Lenovo 770";
        const data = await Service.getAllData(search, categories);
        expect(data).toStrictEqual([])
    })
});

describe('getProductById Tests:', () => {
    test('tests if returns this product:', async () => {
        const prodId = "ad376eb0-0b29-4c65-a5b1-9511c09ae834";
        const product = await Service.getProductById(prodId);
        expect(product.name).toBe("Dell Inspiron 15")
    })

    test('testing incorrect productId:', async () => {
        const prodId = "Phones";
        const res = await request(app).get(`/shopInventory/${prodId}`)
        expect(res.body.message).toBe("Invalid product ID format")
        expect(res.status).toBe(400)
    })
})
describe('tests for updateInventory:', () => {
    test('testing updateInventory:', async () => {
        const body = {
            "items": [
                {
                    "productId": "044576d1-dd03-4787-99bb-ed4a74f4eeeb",
                    "quantity": 10
                }
            ],
            "action": "return"
        }
        const response = await request(app)
            .post('/shopInventory/updateInventory')
            .send(body)
        expect(response.status).toBe(200)
    }) 

    test('tests invalid action:', async () => {
        const body = {
            "items": [
                {
                    "productId": "00365e52-2715-4271-aebc-39ff6fc30456",
                    "quantity": 10
                }
            ],
            "action": "yambaluluShambalulu"
        }
        const response = await request(app).post('/shopInventory/updateInventory').send(body)
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("yambaluluShambalulu: invalid action")
    })
})

