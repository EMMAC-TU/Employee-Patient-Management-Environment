import { Request, Response, Router } from "express";

export class AuthRouteHandler {
    public static buildRouter() {
        const router = Router();

        router.get("/keys", this.generateKeyPairs);

        return router;
    }

    static generateKeyPairs(req: Request, res: Response) {
        res.json({ publicKey: "HelloThere" });
    }
}