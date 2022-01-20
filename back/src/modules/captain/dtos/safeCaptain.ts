import { Captain } from "../models/captain.schema";

export class SafeCaptain {
    _id : string;
    firstname : string;
    lastname : string;
    gender : number

    constructor(_id: string, firstname: string, lastname: string, gender: number) {
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.gender = gender;
    }

    static transformCaptainToSafe(captain : Captain) {
        return new SafeCaptain(captain._id, captain.firstname, captain.lastname, captain.gender);
    }
}