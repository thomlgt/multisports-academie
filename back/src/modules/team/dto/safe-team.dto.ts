import { CaptainNoPass } from "src/modules/captain/dto/captain-nopass.dto";
import { Member } from "../entities/member";
import { Team } from "../entities/team.entity";

export class SafeTeam {

    _id: string
    name: string;
    captain: CaptainNoPass;
    members: Member[];
    createdDate: Date;
    updatedDate: Date;

    constructor(_id: string,
        name: string,
        captain: CaptainNoPass,
        members: Member[],
        createdDate: Date,
        updatedDate: Date) {
            this._id = _id;
            this.name = name;
            this.captain = captain;
            this.members = members;
            this.createdDate = createdDate;
            this.updatedDate = updatedDate;
    }

    /**
     * Cette méthode transforme une team en safe team
     * @param team 
     * @returns 
     */
    static transformTeamToSafeTeam(team : Team) {
        return new SafeTeam(
            team._id,
            team.name,
            CaptainNoPass.transformCaptainToNoPass(team.captain),
            team.members,
            team.createdDate,
            team.updatedDate
        )
    }
}
