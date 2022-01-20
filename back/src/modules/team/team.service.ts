import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member } from './models/member';
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

    async findById(id: string) {
        return this.teamModel.findById(id).populate('captain');
    }

    async delete(id: string) {
        return this.teamModel.findByIdAndDelete(id);
    }

    async addMember(id: string, member: Member) {
        return this.teamModel.findByIdAndUpdate(
            id, 
            {$push : {members: member}, updatedDate: new Date()},
            {new: true});
    }

    async deleteMember(id: string, member: Member) {
        return this.teamModel.findByIdAndUpdate(
            id, 
            {$pull: {members: member}, updatedDate: new Date()},
            {new: true});
    }

    async updateName(id: string, name: string) {
        return this.teamModel.findByIdAndUpdate(
            id, 
            {name: name, updatedDate: new Date()},
            {new: true});
    }


}
