import request from "supertest";
import * as Service from '../services/shopInventoryService';
import { app } from '../server'


describe('tests fot shopInventory controller getAllData: ', () => {
    test('testing if data is in array', async () => {
        const data = await Service.getAllData(undefined, undefined);
        expect(Array.isArray(data)).toBeTruthy()
    })
    test('tests all data return and what is the first product:', async () => {
        const search = undefined;
        const categories = undefined;
        const data = await Service.getAllData(search, categories);
        
        expect(data[0].id).toBe("044576d1-dd03-4787-99bb-ed4a74f4eeeb")
        expect(data[0].name).toBe("Lenovo IdeaPad 3")
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
        const prodId = "0fe42627-961f-41c9-8e12-073d45139309";
        const product = await Service.getProductById(prodId);
        expect(product.name).toBe("Lenovo 20")
    })

    test('testing incorrect productId:', async () => {
        const prodId = "Phones";
        const res = await request(app).get(`/erp/shopInventory/${prodId}`)
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
            "action": "buy"
        }
        const response = await request(app)
            .post('/erp/shopInventory/updateInventory')
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
        const response = await request(app)
            .post('/erp/shopInventory/updateInventory')
            .send(body)
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("yambaluluShambalulu: invalid action")
    })
})

