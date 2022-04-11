import { BcryptDriver } from "../../../drivers/BcryptDriver";
import { Employee } from "../../../shared/entity/Employee";
import { AuthDatastore } from "../datastore/AuthDatastore";
import { IAuthComponent } from "../interfaces/IAuthComponent";

export class AuthComponent implements IAuthComponent {
    private constructor(datastore: AuthDatastore, bcrypt: BcryptDriver) {}

    public static build() {
        const datastore = new AuthDatastore();
        const bcrypt = new BcryptDriver();

        return new AuthComponent(datastore, bcrypt);
    }
    
    /**
     * 
     * @param employeeId 
     * @param password 
     */
    async doPasswordsMatch(employeeId: string, password: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    /**
     * 
     * @param employeeId 
     * @param password 
     */
    async updatePassword(employeeId: string, password: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    /**
     * 
     * @param userId 
     * @param password 
     */
    async login(userId: string, password: string): Promise<Employee> {
        throw new Error("Method not implemented.");
    }
    
    /**
     * 
     * @param employee 
     */
    async createToken(employee: Employee): Promise<any> {
        throw new Error("Method not implemented.");
    }

    /**
     * 
     * @param userId 
     * @param password 
     */
    async createLogin(userId: string, password: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}