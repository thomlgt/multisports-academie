import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CaptainNoPass } from '../captain/dto/captain-nopass.dto';
import { Captain } from '../captain/entities/captain.entity';
import { SafeTeam } from './dto/safe-team.dto';
import { Member } from './entities/member';
import { Team, TeamDocument } from './entities/team.entity';

@Injectable()
export class TeamService {

    constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>){}

    /**
     * Cette méthode créer et enregistre une équipe en base de données
     * @param team
     * @returns 
     */
    async create(team: Team) {
        team.createdDate = new Date();
        team.updatedDate = new Date();
        const createdTeam = new this.teamModel(team);
        return createdTeam.save();
    }

    /**
     * Cette méthode retourne toutes les équipes enregistrées en base de données
     * @returns 
     */
    async findAll() {
        let teams = await this.teamModel.find().populate('captain');
        return teams.map(SafeTeam.transformTeamToSafeTeam);
    }

    /**
     * Cette méthode retourne une équipe enregistrée en 
     * base de données en fonction de son id 
     * @param id 
     * @returns 
     */
    async findById(id: string) {
        let team = await this.teamModel.findById(id).populate('captain')
        return SafeTeam.transformTeamToSafeTeam(team);
    }

    /**
     * Cette méthode retourne une équipe enregistrée en 
     * base de données en fonction de son capitaine 
     * @param id 
     * @returns 
     */
     async findByCaptainId(id: string) {
        let teams = await this.teamModel.find({"captain" : id}).populate('captain');
        return teams.map(SafeTeam.transformTeamToSafeTeam);
    }

    /**
     * Cette méthode supprime une équipe de la base de données
     * @param id 
     * @returns 
     */
    async delete(id: string) {
        return this.teamModel.findByIdAndDelete(id);
    }

    /**
     * Cette méthode permet d'ajouter un membre à une équipe et 
     * d'enregistrer les changements dans la base de données
     * @param id 
     * @param member 
     * @returns 
     */
    async addMember(id: string, member: Member) {
        return this.teamModel.findByIdAndUpdate(
            id, 
            {$push : {members: member}, updatedDate: new Date()},
            {new: true});
    }

    /**
     * Cette méthode permet de supprimer un membre d'une équipe et 
     * d'enregistrer les changements dans la base de données
     * @param id 
     * @param member 
     * @returns 
     */
    async deleteMember(id: string, member: Member) {
        return this.teamModel.findByIdAndUpdate(
            id, 
            {$pull: {members: member}, updatedDate: new Date()},
            {new: true});
    }

    /**
     * Cette méthode permet de modifier le nom d'une équipe 
     * et d'enregistrer les changements dans la base de données
     * @param id 
     * @param name 
     * @returns 
     */
    async updateName(id: string, name: string) {
        return this.teamModel.findByIdAndUpdate(
            id, 
            {name: name, updatedDate: new Date()},
            {new: true});
    }


}
