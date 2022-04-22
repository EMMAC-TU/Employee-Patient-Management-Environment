import { generateUUID } from "../functions/generateUUID";
import { IPatient } from "../interfaces/IPatient";
import { PatientCreation } from "../types/PatientCreation";

export class Patient implements IPatient {
    patientID: string;
    height?: number;
    weight?: number;
    firstName?: string;
    lastName?: string;
    creationDate: Date;
    middleInitial?: string;
    mobilephone?: string;
    workphone?: string | undefined;
    companyName?: string;
    memberId?: string;
    groupNumber?: string;
    streetname1?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    streetname2?: string;
    nextofkin_id?: string;
    nok_phonenumber?: string;
    nok_firstName?: string;
    nok_lastName?: string;

    constructor(patientForm: PatientCreation) {
        this.patientID = generateUUID();
        this.height = patientForm.height;
        this.weight = patientForm.weight;
        this.firstName = patientForm.firstName;
        this.lastName = patientForm.lastName;
        this.creationDate = new Date();
        this.middleInitial = patientForm.middleInitial;
        this.mobilephone = patientForm.mobilephone;
        this.workphone = patientForm.workphone;
        this.companyName = patientForm.companyname;
        this.memberId = patientForm.memberid;
        this.groupNumber = patientForm.groupnumber;
        this.streetname1 = patientForm.streetname1;
        this.city = patientForm.city;
        this.state = patientForm.state;
        this.zipcode = patientForm.zipcode;
        this.country = patientForm.country;
        this.streetname2 = patientForm.streetname2;
        this.nextofkin_id = patientForm.nextofkin_id;
        this.nok_phonenumber = patientForm.nok_phonenumber;
        this.nok_firstName = patientForm.nok_firstName;
        this.nok_lastName = patientForm.nok_lastName;
    }
}