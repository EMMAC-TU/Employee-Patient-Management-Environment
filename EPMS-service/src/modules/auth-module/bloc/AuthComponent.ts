import { ResourceError, ResourceErrorReason } from "../../../shared/types/Errors";
import { BcryptDriver } from "../../../drivers/BcryptDriver";
import { Employee } from "../../../shared/entity/Employee";
import { AuthDatastore } from "../datastore/AuthDatastore";
import { IAuthComponent } from "../interfaces/IAuthComponent";
import { generateToken } from "../../../shared/functions/GenerateToken";
import { IEmployee } from "../../../shared/interfaces/IEmployee";

export class AuthComponent implements IAuthComponent {
    private static instance: IAuthComponent;
    private bcrypt: BcryptDriver = new BcryptDriver();

    public static getInstance() {
        if (!this.instance) {
            this.instance = new AuthComponent();
        }
        return this.instance;
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
    async login(userId: string, password: string): Promise<{ employee: IEmployee, token:string }> {
        const employee = await AuthDatastore.getInstance().login(userId);
        if (!employee) {
            throw new ResourceError(`User with ${userId} was not found`, ResourceErrorReason.INVALID_ACCESS);
        }
        const match = await this.bcrypt.comparePasswords(password, employee.password);
        if (!match) {
            throw new ResourceError('Password is incorrect', ResourceErrorReason.INVALID_ACCESS);
        }
        const token = generateToken(employee);
        
        delete employee.password;

        return { employee, token };
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