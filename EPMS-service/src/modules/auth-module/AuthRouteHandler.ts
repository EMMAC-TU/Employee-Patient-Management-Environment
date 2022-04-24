import { NextFunction, Request, Response, Router } from "express";
import { ResourceErrorReason } from "../../shared/types/Errors";
import { ResourceError } from "../../shared/types/Errors";
import { generateToken } from "../../shared/functions/GenerateToken";
import { EmployeeComponent } from "../employee-module/bloc/EmployeeComponent";
import { AuthComponent } from "./bloc/AuthComponent";

export class AuthRouteHandler {
    public static buildRouter() {
        const router = Router();

        router.get('/keys', this.generateKeyPairs);
        router.post('/auth/password');
        router.post('/auth/login', this.login);
        router.post('/auth/employees');

        return router;
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body.userid) {
                throw new ResourceError("Username not provided", ResourceErrorReason.BAD_REQUEST);
            }
            if (!req.body.password) {
                throw new ResourceError("Password not provided", ResourceErrorReason.BAD_REQUEST);
            }

            const user = await AuthComponent.getInstance().login(req.body.userid, req.body.password);
            
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    static generateKeyPairs(req: Request, res: Response) {
        res.json({ publicKey: "HelloThere" });
    }
}