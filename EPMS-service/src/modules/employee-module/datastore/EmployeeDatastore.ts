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
    
    async getEmployee(employeeId: string): Promise<Employee[]> {
        const query = this.buildGetEmployeeQuery(true, employeeId);
        const { rows } = await this.client.query(query)
        return rows;
    }
    
    async getEmployees(): Promise<Employee[]> {
        const query = this.buildGetEmployeeQuery(false);
        const { rows } = await this.client.query(query);
        return rows
    }

    async updateEmployee(employeeId: string, updateEmployee: Partial<Employee>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async createEmployee(newEmployee: Employee): Promise<void> {
        const query = this.buildCreateEmployeeQuery(newEmployee);
        const res = await this.client.query(query);
        console.log(res);
    }

    async searchEmployees(query: string): Promise<Employee[]> {
        throw new Error("Method not implemented.");
    }
    
    buildCreateEmployeeQuery(emp: Employee) {
        const query = {
            text: "INSERT INTO \
                employee(employeeid, firstname, middleinitial,lastname, \
                    dateofbirth, startdate, enddate, homephone, mobilephone, \
                    workphone, email, position, userid, password, streetname1, \
                    streetname2, zipcode, city, state, country) \
                values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)",
            values: [emp.employeeid, emp.firstname, emp.middleinitial, emp.lastname, emp.dateofbirth, emp.startdate,
                null, emp.homephone, emp.mobilephone, emp.workphone, emp.email, emp.position, emp.userid, emp.password, 
                emp.streetname1, emp.streetname2, emp.zipcode, emp.city, emp.state, emp.country]
        }
        return query
    }

    buildGetEmployeeQuery(isIndividual?: boolean, employeeId?: string){
        let txt = "SELECT \
        employeeid, firstname, middleinitial, lastname, dateofbirth, \
        startdate, homephone, mobilephone, workphone, email, position, userid, \
        streetname1, streetname2, zipcode, city, state, country \
        FROM employee";
        const query = {
            text: isIndividual && employeeId ? txt += " WHERE employeeid = $1" : txt,
            values: !employeeId ? undefined : [employeeId]
        };
        return query;
    }
    
}