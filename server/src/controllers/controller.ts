import { Request, Response } from "express";
import * as services from "../services/services";
import { Product } from "../types/Product";

export const externalGetAllData = async (req: Request, res: Response) => {
    try {
        const myUrl = req.url;
        const searchParam =  req.query.search?.toString();
        const allData =  await services.getAllData(searchParam);
        res.send(allData)
    }
    catch (error) {
        console.error('an error occurred:', error);
        res.status(500).send("Internal Server Error");
    }
}