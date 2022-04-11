import { Request, Response, Router } from "express";

export class PatientRouteHandler {
    public static buildRouter() {
        const router = Router();

        router.get('/patients', this.getPatients);
        router.post('/patients');
        router.get('/patients/:id');
        router.patch('/patients/:id');
        router.get('/patients/search');
        
        return router;
    }

    static getPatients(req: Request, res: Response) {
        res.json( {patients: "ALL Patients" } );
    }
}