import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './models/team.schema';

@Injectable()
export class TeamService {

    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>){}

    async create(team: Team) {
        team.createdDate = new Date();
        team.updatedDate = new Date();
        const createdTeam = new this.teamModel(team);
        return createdTeam.save();
    }

    async findAll() {
        return this.teamModel.find().populate('captain');
    }


}
