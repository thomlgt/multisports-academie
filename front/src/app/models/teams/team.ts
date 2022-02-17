import { Captain } from "../captain/captain";
import { Member } from "../members/member";

export class Team {

    _id: string;
    name: string;
    captain: Captain;
    members: Member[];
    createdDate: Date;
    updatedDate: Date;
}