import { Employee } from "../../../shared/entity/Employee";
import { IEmployeeComponent } from "../interfaces/IEmployeeComponent";
import { EmployeeDatastore } from "../datastore/EmployeeDatastore";
import { EmployeeCreation } from "../../../shared/types/EmployeeCreation";
import { BcryptDriver } from "../../../drivers/BcryptDriver";
import { validatePasswordCriteria, validateEmailCriteria } from "../../../shared/functions/validator";
import { SearchQuery } from "../../../shared/types/SearchQuery";
import { ResourceError, ResourceErrorReason } from "../../../shared/types/Errors";

const POSITIONS = {
    ADMIN: 'administrator',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    VENDOR: 'vendor',
    RECEPTIONIST: 'receptionist'
};

export class EmployeeComponent implements IEmployeeComponent{
    private static instance: IEmployeeComponent;

    public static getInstance(): IEmployeeComponent {
        if (!this.instance) {
            this.instance = new EmployeeComponent();
        }
        return this.instance;
    }

    /**
     * 
     * @param employeeID 
     */
    async getEmployee(employeeID: string): Promise<Employee> {
        const emp = await EmployeeDatastore.getInstance().getEmployee(employeeID);
        if (emp.length == 0) {
            throw new ResourceError("Employee Not Found", ResourceErrorReason.NOT_FOUND);
        }
        return emp[0] as Employee
    }

    /**
     * 
     * @returns 
     */
    async getEmployees(): Promise<Employee[]> {
        return await EmployeeDatastore.getInstance().getEmployees();
    }

    /**
     * 
     * @param newEmployee 
     */
    async createEmployee(newEmployee: EmployeeCreation): Promise<Employee> {
        if (this.isMissingRequiredFields(newEmployee)) {
            throw new ResourceError("Missing a field", ResourceErrorReason.BAD_REQUEST);
        }
        if (await EmployeeDatastore.getInstance().doesEmployeeExist({ field: 'userid', value: newEmployee.userid })) {
            throw new ResourceError("Username already exists", ResourceErrorReason.BAD_REQUEST);
        }
        if (await EmployeeDatastore.getInstance().doesEmployeeExist({ field: 'email', value: newEmployee.email.toLowerCase() })) {
            throw new ResourceError("Email already exists", ResourceErrorReason.BAD_REQUEST);
        }

        this.validateInput(newEmployee);
        const hasher = new BcryptDriver();
        newEmployee.password =  await hasher.saltPassword(newEmployee.password);
        const employee = new Employee(newEmployee);

        await EmployeeDatastore.getInstance().createEmployee(employee);

        return employee;
    }

    /**
     * 
     * @param employeeId 
     * @param updatedEmployee 
     */
    async updateEmployee(employeeId: string, updatedEmployee: Partial<Employee>): Promise<void> {
        if (!(await EmployeeDatastore.getInstance().doesEmployeeExist({ field: 'employeeid', value: employeeId }))) {
            throw new ResourceError("Employee does not exist", ResourceErrorReason.NOT_FOUND);
        }
        this.verifyUpdateFields(updatedEmployee);
        await EmployeeDatastore.getInstance().updateEmployee(employeeId, updatedEmployee);
    }

    /**
     * 
     * @param query 
     */
    async findEmployees(query: SearchQuery): Promise<Employee[]> {
        return await EmployeeDatastore.getInstance().searchEmployees(query);
    }

    /**
     * 
     * @param newEmp 
     * @returns 
     */
    private isMissingRequiredFields(newEmp: EmployeeCreation) {
        return !( newEmp.streetname1 &&
            newEmp.city &&
            newEmp.state &&
            newEmp.zipcode &&
            newEmp.country &&
            newEmp.dateofbirth && 
            newEmp.email && 
            newEmp.firstname && 
            newEmp.lastname && 
            newEmp.userid &&
            newEmp.middleinitial &&
            newEmp.password &&
            newEmp.position)
    }

    /**
     * 
     * @param uEmp 
     */
    private verifyUpdateFields(uEmp: Partial<Employee>) {
        const cantUpdateFields = ['employeeid'];
        Object.keys(uEmp).forEach((key, i) => {
            if (cantUpdateFields.includes(key)){
                throw new ResourceError(`Cannot update ${key}`, ResourceErrorReason.FORBIDDEN);
            }
        })
    }

    /**
     * 
     * @param newEmp 
     */
    private validateInput(newEmp: EmployeeCreation) {
        validatePasswordCriteria(newEmp.password);
        validateEmailCriteria(newEmp.email);
        if(newEmp.middleinitial.length > 1){
            throw new ResourceError("Middle Initial Should be Length 1", ResourceErrorReason.BAD_REQUEST);
        }
        
        if(newEmp.position !== POSITIONS.ADMIN &&
            newEmp.position !== POSITIONS.DOCTOR &&
            newEmp.position !== POSITIONS.NURSE &&
            newEmp.position !== POSITIONS.RECEPTIONIST &&
            newEmp.position !== POSITIONS.VENDOR){
            throw new ResourceError("Position of employee is not valid", ResourceErrorReason.BAD_REQUEST);
        }
        if(newEmp.homephone && !newEmp.homephone.match(/^\d{10}$/)){
            throw new ResourceError("Home phone number is not formatted correctly", ResourceErrorReason.BAD_REQUEST);
        }
        if(newEmp.mobilephone && !newEmp.mobilephone.match(/^\d{10}$/)){
            throw new ResourceError("Mobile phone number is not formatted correctly", ResourceErrorReason.BAD_REQUEST);
        }
        if(newEmp.workphone && !newEmp.workphone.match(/^\d{10}$/)){
            throw new ResourceError("Work phone number is not formatted correctly", ResourceErrorReason.BAD_REQUEST);
        }
        return true
    }

    


}