import express, { Router } from 'express'
import {allInventoryController} from '../controllers/inventoryController'

const router = express.Router()

router.get('/inventory/', allInventoryController)
router.get('inventory/:id')