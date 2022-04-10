import { Request, Response, Router } from "express";

export class PatientRouteHandler {
    public static buildRouter() {
        const router = Router();

        router.get("/patients", this.getPatients);

        return router;
    }

    static getPatients(req: Request, res: Response) {
        res.json( {patients: "ALL Patients" });
    }
}