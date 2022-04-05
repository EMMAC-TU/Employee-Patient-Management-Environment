import { Address } from "../types/Address";

export interface IEmployee {
    /**
     * 
     */
    userID: string;

    /**
     * 
     */
    firstName: string;

    /**
     * 
     */
    lastName: string;

    /**
     * 
     */
    email: string;

    /**
     * 
     */
    address: Address,

    /**
     * 
     */
    position: string;

    /**
     * 
     */
    phoneNumber: string;
}