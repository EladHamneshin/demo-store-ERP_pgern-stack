import { Request, Response } from 'express'
import { updateInventoryService } from '../services/updateInventoryService';

export async function updateInventoryController(req: Request, res: Response) {
    try {
        // ניסיון לעדכן את המלאי
        const success = await updateInventoryService(req);
        res.status(200).json(success)
    } catch (error) {
        // טיפול בשגיאה במקרה של חריגה
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}