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
        var query = ['INSERT INTO employee(']
        
        var keys: string[] = [];
        var placeholders: string[] = [];
        var vals: string[] = [];

        Object.entries(emp).forEach((value, index) =>{
            keys.push(value[0]);
            placeholders.push(`$${index+1}`);
            vals.push(value[1]);
        });

        query.push(keys.join(','));
        query.push(') VALUES('); // Close the keys list
        query.push(placeholders.join(','));
        query.push(')');

        const queryobj = {
            text: query.join(' '),
            values: vals
        }
        console.log(queryobj);
        return queryobj
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