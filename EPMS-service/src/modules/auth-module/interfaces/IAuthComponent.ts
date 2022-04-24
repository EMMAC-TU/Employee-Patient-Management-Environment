import { IEmployee } from "../../../shared/interfaces/IEmployee";
import { Employee } from "../../../shared/entity/Employee";

export interface IAuthComponent {
    /**
     * 
     * @param employeeId 
     * @param password 
     */
    doPasswordsMatch(employeeId: string, password: string): Promise<boolean>;

    /**
     * 
     * @param employeeId 
     * @param password 
     */
    updatePassword(employeeId: string, password: string): Promise<void>;

    /**
     * 
     * @param userId 
     * @param password 
     */
    login(userId: string, password: string):Promise<{ employee: IEmployee, token:string }>;

    /**
     * 
     * @param employee 
     */
    createToken(employee: Employee): Promise<any>;
    

    /**
     * 
     * @param userId 
     * @param password 
     */
    createLogin(userId: string, password: string): Promise<void>;

}