import { Captain } from "../entities/captain.entity";

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

    /**
     * Cette méthode permet de mapper 
     * un capitaine en safe-capitaine
     * @param captain 
     * @returns 
     */
    static transformCaptainToSafe(captain : Captain) {
        return new SafeCaptain(captain._id, captain.firstname, captain.lastname, captain.gender);
    }
}