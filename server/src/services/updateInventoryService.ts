import { Request, Response } from 'express'
import { updateInventoryDal } from "../dal/updateInventoryDal"

export async function updateInventoryService (req: Request) { 

        // בדיקה שהבקשה מכילה גוף תקין
    if (!req.body || !Array.isArray(req.body)) {
        throw new Error('Invalid request body');
    }

    // לולאה על פריטי הבקשה
    for (const item of req.body) {
        const { productId, requiredQuantity } = item;

        // בדיקה שיש productId בבקשה
        if (!productId) {
            throw new Error('no product id');
        }

        // בדיקה שהכמות הנדרשת חוקית
        if (requiredQuantity === undefined || requiredQuantity <= 0) {
            throw new Error('not enough in stock');
        }

    }
    const res = await updateInventoryDal(req.body)
    if (!res){
        throw new Error ('error')
    }
    else {
        return res
    }
}

