import { Address } from "../types/Address";
import { InsuranceInfo } from "../types/InsuranceInfo";
import { NextOfKin } from "../types/NextOfKin";

export interface IPatient {
    patientID: string;
    height: number;
    weight: number;
    firstName: string;
    lastName: string;
    creationDate: Date;
    middleInitial: string;
    mobilePhoneNumber: string;
    workPhoneNumber?: string;
    nextOfKin: NextOfKin;
    insuranceInfo: InsuranceInfo;
    address: Address
}