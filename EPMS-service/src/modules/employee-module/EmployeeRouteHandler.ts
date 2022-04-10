import { NextFunction, Request, Response, Router } from "express";

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

        router.get("/employees", this.getEmployees);

        return router;
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    static getEmployees(req: Request, res: Response, next: NextFunction) {
        res.json({ message: "Hello world" });
    }
}