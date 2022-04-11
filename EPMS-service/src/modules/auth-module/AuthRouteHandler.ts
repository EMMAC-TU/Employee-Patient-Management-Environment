import { Request, Response, Router } from "express";

export class AuthRouteHandler {
    public static buildRouter() {
        const router = Router();

        router.get('/keys', this.generateKeyPairs);
        router.post('/auth/password');
        router.post('/auth/login');
        router.post('/auth/employees');

        return router;
    }

    static generateKeyPairs(req: Request, res: Response) {
        res.json({ publicKey: "HelloThere" });
    }
}