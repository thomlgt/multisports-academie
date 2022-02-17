import { Captain } from "../entities/captain.entity";

export class CaptainNoPass {

    _id: string
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    birthdate: Date;
    gender: number;

    constructor(_id: string,
        firstname: string,
        lastname: string,
        email: string,
        phone: string,
        birthdate: Date,
        gender: number) {
            this._id = _id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.phone = phone;
            this.birthdate = birthdate;
            this.gender = gender
        }

    /**
     * Cette méthode permet de mapper 
     * un capitaine en safe-capitaine
     * @param captain 
     * @returns 
     */
     static transformCaptainToNoPass(captain : Captain) {
        return new CaptainNoPass(
            captain._id, 
            captain.firstname, 
            captain.lastname,
            captain.email,
            captain.phone,
            captain.birthdate, 
            captain.gender);
    }
}