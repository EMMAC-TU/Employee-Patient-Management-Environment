import { ExpressDriver } from "./drivers/ExpressDriver";
import * as http from "http";

const app = ExpressDriver.build();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT,async () => {
    console.log(`EPMS started at http://localhost:${ PORT }`);
});