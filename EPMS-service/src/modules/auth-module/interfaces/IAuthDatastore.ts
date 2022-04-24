import { Employee } from "../../../shared/entity/Employee";

export interface IAuthDatastore {
    login(userid: string): Promise<Employee>;
}