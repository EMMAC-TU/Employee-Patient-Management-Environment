import { IPatient } from "../interfaces/IPatient";
import { Address } from "../types/Address";
import { InsuranceInfo } from "../types/InsuranceInfo";
import { NextOfKin } from "../types/NextOfKin";

export class Patient implements IPatient {
    patientID: string;
    height: number;
    weight: number;
    firstName: string;
    lastName: string;
    creationDate: Date;
    middleInitial: string;
    mobilePhoneNumber: string;
    workPhoneNumber?: string | undefined;
    nextOfKin: NextOfKin;
    insuranceInfo: InsuranceInfo;
    address: Address;

    constructor() {
        this.patientID = "";
        this.height = 0;
        this.weight = 0;
        this.firstName = "";
        this.lastName = "";
        this.creationDate = new Date();
        this.middleInitial = "";
        this.mobilePhoneNumber = "";
        this.workPhoneNumber = "";
        this.nextOfKin = {
            nextOfKinId: "",
            mobilePhoneNumber: "",
            firstName: "",
            lastName: ""
        };
        this.insuranceInfo = {
            insuranceId: "",
            patientId: this.patientID,
            companyName: "",
            memberId: "",
            groupNumber: ""
        }
        this.address = {
            streetAddress1: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
        }
    }
}