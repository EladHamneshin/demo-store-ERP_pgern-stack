import { dalAllData } from "../dal/dal";
import * as controller from "../controllers/controller";

export const getAllData = async (searchParam: string|undefined) => {
    try {
        const allData = await dalAllData(searchParam);
        return allData;
    } catch (error) {
        console.error('an error occurred at services:', error)
    }
}

