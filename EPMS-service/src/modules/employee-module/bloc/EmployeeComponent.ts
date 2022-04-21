import { Employee } from "../../../shared/entity/Employee";
import { IEmployeeComponent } from "../interfaces/IEmployeeComponent";
import { EmployeeDatastore } from "../datastore/EmployeeDatastore";
import { EmployeeCreation } from "../../../shared/types/EmployeeCreation";
import { BcryptDriver } from "../../../drivers/BcryptDriver";

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
            throw new Error("Employee Not Found");
        }
        return emp[0] as Employee
    }

    async getEmployees(): Promise<Employee[]> {
        return await EmployeeDatastore.getInstance().getEmployees();
    }

    /**
     * 
     * @param newEmployee 
     */
    async createEmployee(newEmployee: EmployeeCreation): Promise<Employee> {
        console.log(newEmployee)
        if (this.isMissingRequiredFields(newEmployee)) {
            throw new Error("Missing a field");
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
    updateEmployee(employeeId: string, updatedEmployee: Partial<Employee>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    /**
     * 
     * @param query 
     */
    findEmployees(query: string): Promise<Employee[]> {
        throw new Error("Method not implemented.");
    }

    private isMissingRequiredFields(newEmp: EmployeeCreation) {
        return !( newEmp.streetname1 &&
            newEmp.city &&
            newEmp.state &&
            newEmp.zipcode &&
            newEmp.country &&
            newEmp.dateofbirth && 
            newEmp.email && 
            newEmp.firstname && 
            newEmp.lastName && 
            newEmp.userid &&
            newEmp.middleinitial &&
            newEmp.password &&
            newEmp.position)
        
    }

    /**
     * 
     * @param newEmp 
     */
    private validateInput(newEmp: EmployeeCreation) {
        if(newEmp.middleinitial.length > 1){
            throw new Error("Middle Initial Should be Length 1");
        }
        if(!newEmp.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            throw new Error("Email is not formatted correctly");
        }
        if(newEmp.position !== POSITIONS.ADMIN &&
            newEmp.position !== POSITIONS.DOCTOR &&
            newEmp.position !== POSITIONS.NURSE &&
            newEmp.position !== POSITIONS.RECEPTIONIST &&
            newEmp.position !== POSITIONS.VENDOR){
            throw new Error("Position of employee is not valid");
        }
        if(newEmp.homephone && !newEmp.homephone.match(/^\d{10}$/)){
            throw new Error("Home phone number is not formatted correctly");
        }
        if(newEmp.mobilephone && !newEmp.mobilephone.match(/^\d{10}$/)){
            throw new Error("Mobile phone number is not formatted correctly");
        }
        if(newEmp.workphone && !newEmp.workphone.match(/^\d{10}$/)){
            throw new Error("Work phone number is not formatted correctly");
        }
        return true
    }
}