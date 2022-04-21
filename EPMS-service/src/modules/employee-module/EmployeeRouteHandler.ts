import { NextFunction, Request, Response, Router } from "express";
import { EmployeeCreation } from "../../shared/types/EmployeeCreation";
import { EmployeeComponent } from "./bloc/EmployeeComponent";
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
        router.get('/employees/:id', this.getEmployee);
        router.get('/employes/search');
        router.post('/employees', this.createEmployee);
        router.patch('/employees/:id');
        
        return router;
    }

    static async getEmployee(req: Request, res: Response, next: NextFunction) {
        try {
            if(!req.params.id) {
                throw new Error("Employee ID Required");
            }
            const employeeId = req.params.id;
            const emp = await EmployeeComponent.getInstance().getEmployee(employeeId);

            res.json({...emp}).status(200);
        } catch (err) {
            res.json({
                error: err
            }).status(400);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    static async getEmployees(req: Request, res: Response, next: NextFunction) {
        const emp = await EmployeeComponent.getInstance().getEmployees();
        res.json({ emp });
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    static async createEmployee(req: Request, res: Response, next: NextFunction) {
        const newEmp = req.body as EmployeeCreation
        try{
            const emp = await EmployeeComponent.getInstance().createEmployee(newEmp);
            res.json({...emp}).status(201)
        } catch (err){
            console.log(err)
            res.send(err).status(400)
        }
    }
}