import { NextFunction, Request, Response, Router } from "express";
import { EmployeeDatastore } from "./datastore/EmployeeDatastore";

/**
 * 
 */
export class EmployeeRouteHandler {

    /**
     * 
     * @returns 
     */
    public static buildRouter() {
        const router = Router();

        router.get('/employees', this.getEmployees);
        router.get('/employees/:id');
        router.get('/employes/search');
        router.post('/employees');
        router.patch('/employees/:id');
        
        return router;
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    static async getEmployees(req: Request, res: Response, next: NextFunction) {
        const emp = await EmployeeDatastore.getInstance().getEmployees();
        res.json({ emp });
    }
}