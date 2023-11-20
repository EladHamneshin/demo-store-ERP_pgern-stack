
import {allInventoryDal} from '../dal/inventoryDal'

export const allInventoryService = async () => {
    const inventory = await allInventoryDal()
}