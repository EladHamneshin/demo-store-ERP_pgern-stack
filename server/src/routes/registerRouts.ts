import express from 'express'
import {registerController} from '../controllers/registerController'

export const registerRouter = express.Router()

registerRouter.post('/register/', registerController)