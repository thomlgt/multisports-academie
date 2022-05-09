import { SafeTeam } from 'src/modules/team/dto/safe-team.dto';
import { Registration } from '../entities/registration';
import { Score } from '../entities/score';

export class SafeRegistration {

    team: SafeTeam;
    validationStatus: string;
    scores: Score[];

    constructor(
        team: SafeTeam,
        validationStatus: string,
        scores: Score[]
    ) {
        this.team = team;
        this.validationStatus = validationStatus;
        this.scores = scores;
    }

    /**
     * Cette méthode permet de mapper une inscription en
     *  inscription safe
     * @param registration
     * @returns 
     */
    static transformRegistrationToSafe(registration : Registration) {
        return new SafeRegistration(
            SafeTeam.transformTeamToSafeTeam(registration.team),
            registration.validationStatus,
            registration.scores
        );
    }
    
}