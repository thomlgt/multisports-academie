import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Captain, CaptainDocument } from './models/captain.schema';
import { SafeCaptain } from './dtos/safeCaptain';
import { classToPlain, instanceToPlain, plainToInstance } from 'class-transformer';
import { CreateCaptain } from './dtos/createCaptain';
import { UpdateEmailCaptain } from './dtos/updateEmailCaptain';

@Injectable()
export class CaptainService {

    constructor(@InjectModel(Captain.name) private captainModel: Model<CaptainDocument>){}

    /**
     * Cette méthode permet de créer un capitaine
     * dans la base de données et renvoie un capitaine safe
     * @param createCaptain 
     * @returns 
     */
    async create(@Body() createCaptain : CreateCaptain) {
        //Transformation du DTO createCaptain en Captain
        let captain : Captain = plainToInstance(Captain, createCaptain);
        captain.createdDate = new Date();
        captain.updatedDate = new Date();
        const createdCaptain = new this.captainModel(captain);
        return createdCaptain.save().then((cpt) => {
            return SafeCaptain.transformCaptainToSafe(cpt)
        });
    }

    /**
     * Cette méthode retourne tous les capitaines 
     * enregistrés dans la base de données de manière safe
     * @returns 
     */
    async findAll() {
        let captains = await this.captainModel.find();
        return captains.map(SafeCaptain.transformCaptainToSafe)
    }

    /**
     * Cette méthode retourne un capitaine enregistré
     * dans la base de données de manière safe en fonction 
     * de son id
     * @param id 
     * @returns 
     */
    async findById(id : string) {
        const captain = await this.captainModel.findById(id)
        return SafeCaptain.transformCaptainToSafe(captain);
    }

    /**
     * Cette méthode permet de supprimer un capitaine de
     * la base de données en fonction de son id et retourne
     * le capitaine supprimé de manière safe
     * @param id 
     * @returns 
     */
    async delete(id: string) {
        return this.captainModel.findByIdAndRemove(id).then(() => {
            return `Le capitaine (id : ${id}) a bien été supprimé.`
        });
    }

    /**
     * Cette méthode permet de modifier l'adresse email d'un 
     * capitaine enregistré dans la base de données et 
     * le retourne
     * @param id 
     * @param email 
     * @returns 
     */
    async updateEmail(id: string, captain : UpdateEmailCaptain) : Promise<Captain> {
        return await this.captainModel.findByIdAndUpdate(
            id, 
            {email : captain.email, updatedDate: new Date()}, 
            {new: true}
        );
    }
        
}
