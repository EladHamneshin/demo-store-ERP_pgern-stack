import { Request, Response } from 'express';
import {allInventoryService} from '../services/inventoryService'

export const allInventoryController = async (req: Request , res: Response) => {
    try {
        const allInventory = await allInventoryService();
        res.json(allInventory)
    } catch (error){
        res.json({ error: "Couldn't fetch the inventory!" })
    }
}