import { IEmployee } from "../interfaces/IEmployee";
import { Address } from "../types/Address";

export class Employee implements IEmployee {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    address: Address;
    position: string;
    phoneNumber: string;
    
    constructor() {
        this.userID = "";
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.address = {
            streetAddress1: "",
            zipCode: "",
            state: "",
            country: "",
            city: ""
        };
        this.position = "";
        this.phoneNumber = "";
    }
}