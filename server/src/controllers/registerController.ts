import { Request, Response } from 'express';

import {registerService} from '../services/registerService'


export const registerController = (req:Request, res:Response) => {
    try {
        return registerService(req.body)
        .then(date => {
            res.json(date)
        })
    } catch(error) {
        console.log(error);
        
    }
}