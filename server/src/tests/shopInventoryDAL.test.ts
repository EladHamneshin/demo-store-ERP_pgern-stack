import query from "../utils/queryDB";
import { Product } from '../types/Product';
import { getAllDataQuery } from "../types/SQLqueries";

describe("Tests shopInventory Dal:", () => {
    test('getAllData test:', async () => {
        const allDataQuery = `
            ${getAllDataQuery}
            WHERE p.name LIKE '%Lenovo%'
            OR p.description LIKE '%Lenovo%'
            GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat`;
        const {rows}: { rows: Product[] } = await query(allDataQuery);
        expect(rows[0].name).toBe("Lenovo IdeaPad 3");
    })
    test('Tests getProductById Dal:', async () => {
        const IdQuery = `
        ${getAllDataQuery}
        where p.id = 'fc9f2a22-0f59-4c31-bd99-8f6d2b405c63'
        GROUP BY p.id, c.name, i.url, i.alt, c2.lng, c2.lat`;
        const {rows}: { rows: Product[] } = await query(IdQuery);
        const [product] = rows;
        expect(product.name).toBe("Samsung Galaxy S21")
    })
    test('Tests checkQuantity Dal:', async ()=> {
        const checkQuery = `
        select quantity from products 
        where id = '0a26f087-42e9-4d47-a3cb-e3704ed37e3d'`;
        const { rows }: { rows: Product[] } = await query(checkQuery);
        const [{ quantity }] = rows;
        expect(typeof(quantity)).toBe('number')
    })
    test('Tests updateInventory Dal:', async () => {
        const queryString =
        `UPDATE products
        SET quantity = 850
        WHERE id = '0a26f087-42e9-4d47-a3cb-e3704ed37e3d';`
        const message = await query(queryString)
        expect(message.command).toBe('UPDATE')        
    })
})