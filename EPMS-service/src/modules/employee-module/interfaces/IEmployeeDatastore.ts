import { Employee } from "../../../shared/entity/Employee";

export interface IEmployeeDatastore {
    
    doesEmployeeExist(employeeId: string): Promise<boolean>;
    getEmployee(employeeId: string): Promise<Employee>;
    getEmployees(): Promise<Employee[]>;
}