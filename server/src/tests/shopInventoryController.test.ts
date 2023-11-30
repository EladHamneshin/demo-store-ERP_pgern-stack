import request from "supertest";
import * as Service from '../services/shopInventoryService';
import { Json } from "sequelize/lib/utils";


describe('tests fot shopInventory controller getAllData: ', () => {
    test('testing if data is in array', async () => {
        const data = await Service.getAllData(undefined, undefined);        
        expect(Array.isArray(data)).toBeTruthy()
    })
    test('tests all data return and what is first product',  async() => {
        const search = undefined;  
        const categories = undefined;
        const data = await Service.getAllData(search, categories);

        expect(data[0].id).toBe("044576d1-dd03-4787-99bb-ed4a74f4eeeb")
        expect(data[0].name).toBe("Lenovo IdeaPad 3")
    })
    test('tests searchParams:',  async() => {
        const search = "Lenovo 770";  
        const categories = undefined;
        const data = await Service.getAllData(search, categories);

        expect(data[0].id).toBe("0a26f087-42e9-4d47-a3cb-e3704ed37e3d")
        expect(data[0].name).toBe("Lenovo 770")
    })
    test('tests categoryParams:',  async() => {
        const search = undefined;  
        const categories = "Computers";
        const data = await Service.getAllData(search, categories);

        expect(data[0].category).toBe("Computers")
        expect(data[2].category).not.toBe("Phones") 
    })

    test('testing getProductById:', async () => {
        const prodId = "0fe42627-961f-41c9-8e12-073d45139309";
        const product = await Service.getProductById(prodId);        
        expect(product.name).toBe("Lenovo 20")
    })

    // test('testing updateInventory:', async () => {
    //     const req = {body: {
    //         "items": [
    //             {
    //                 "productId": "0fe42627-961f-41c9-8e12-073d45139309",
    //                 "quantity": 10
    //             }
    //         ],
    //         "action": "buy"
    //     }} 
    //     const status = await Service.updateInventory(req); // to fix
    //     expect(status).toBe(200)
    // })
});


