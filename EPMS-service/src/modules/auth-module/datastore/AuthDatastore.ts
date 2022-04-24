import { buildLoginQuery } from "../../../shared/functions/BuildQuery";
import { Employee } from "../../../shared/entity/Employee";
import { IAuthDatastore } from "../interfaces/IAuthDatastore";
import { PostgresDriver } from "../../../drivers/PostgresDriver";

export class AuthDatastore implements IAuthDatastore {
    private static instance: IAuthDatastore;
    private client = PostgresDriver.client;

    public static getInstance(): IAuthDatastore {
        if (!this.instance) {
            this.instance = new AuthDatastore();
        }
        return this.instance;
    }

    async login(userid: string): Promise<Employee> {
        const query = buildLoginQuery(userid);
        return await (await this.client.query(query)).rows[0] as Employee;
    }

}