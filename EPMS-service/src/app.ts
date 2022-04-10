import cors from "cors"
import express = require('express');
import cookieParser = require('cookie-parser');
const version = ""

export class ExpressDriver {
    public static app = express();
    
    public static build() {
        return this.buildDriver();
    }

    private static buildDriver() {
        this.app.use(express.json());
        this.app.use(cors({ origin: true, credentials: true }))
        this.initServer();
    }

    private static initServer() {
        this.app.get("/", (req, res) => {
            res.json({ message: `Welcome to the Employee-Patient-Management-Service Version ${version}`});
        });
    }
}