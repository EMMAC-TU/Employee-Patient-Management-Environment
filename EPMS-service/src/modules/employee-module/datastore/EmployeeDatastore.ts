import { QueryConfig } from "../../../shared/types/QueryConfig";
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
    
    /**
     * 
     * @param employeeId 
     * @returns 
     */
    async doesEmployeeExist(employeeId: string): Promise<boolean> {
        return (await this.getEmployee(employeeId)).length > 0;
    }
    
    /**
     * 
     * @param employeeId 
     * @returns 
     */
    async getEmployee(employeeId: string): Promise<Employee[]> {
        const query = this.buildGetEmployeeQuery(true, employeeId);
        const { rows } = await this.client.query(query)
        return rows;
    }
    
    /**
     * 
     * @returns 
     */
    async getEmployees(): Promise<Employee[]> {
        const query = this.buildGetEmployeeQuery(false);
        const { rows } = await this.client.query(query);
        return rows
    }

    /**
     * 
     * @param employeeId 
     * @param updateEmployee 
     */
    async updateEmployee(employeeId: string, updateEmployee: Partial<Employee>): Promise<void> {
        const query = {
            text: this.buildUpdateEmployeeQuery(employeeId, updateEmployee),
        }
        const values : string[] = [];
        Object.values(updateEmployee).forEach( (val, i) => {
            values.push(val);
        });
        values.push(employeeId);
        
        const { rows } = await this.client.query(query, values);
   
    }

    /**
     * 
     * @param newEmployee 
     */
    async createEmployee(newEmployee: Employee): Promise<void> {
        const query = this.buildCreateEmployeeQuery(newEmployee);
        const res = await this.client.query(query);
        console.log(res);
    }

    /**
     * 
     * @param query 
     */
    async searchEmployees(query: string): Promise<Employee[]> {
        throw new Error("Method not implemented.");
    }
    
    /**
     * 
     * @param emp 
     * @returns 
     */
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

    /**
     * 
     * @param isIndividual 
     * @param employeeId 
     * @returns 
     */
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

    /**
     * 
     * @param employeeid 
     * @param uEmp 
     * @returns 
     */
    buildUpdateEmployeeQuery(employeeid: string, uEmp: Partial<Employee>) {
        // Setup static beginning of query
        var query = ['UPDATE employee'];
        query.push('SET');
        
        // Create another array storing each set command
        // and assigning a number value for parameterized query
        var set:string[] = [];
        let count = 0;
        Object.keys(uEmp).forEach(function (key, i) {
            set.push(key + ' = $' + (count + 1)); 
            count++;
        });
        query.push(set.join(', '));
        count++;
        // Add the WHERE statement to look up by id
        query.push('WHERE employeeid = $' + count );
        
        // Return a complete query string
        return query.join(' ');
          
    }
    
}