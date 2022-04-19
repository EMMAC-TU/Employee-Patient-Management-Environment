import { PostgresDriver } from "../../../drivers/PostgresDriver";
import { Employee } from "../../../shared/entity/Employee";
import { IEmployeeDatastore } from "../interfaces/IEmployeeDatastore";

export class EmployeeDatastore implements IEmployeeDatastore {

    private client = PostgresDriver.client
    private static instance: IEmployeeDatastore;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new EmployeeDatastore();
        }
        return this.instance;
    }
    async doesEmployeeExist(employeeId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    async getEmployee(employeeId: string): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    
    async getEmployees(): Promise<Employee[]> {
        const res = await this.client.query("Select * from employee");
        return res.rows;
    }
    
}