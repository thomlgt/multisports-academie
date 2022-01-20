import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Captain, CaptainDocument } from './models/captain.schema';
import { SafeCaptain } from './dtos/safeCaptain';
import { classToPlain, instanceToPlain, plainToInstance } from 'class-transformer';
import { CreateCaptain } from './dtos/createCaptain';

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
        return this.captainModel.find().then((cpts) => {
            let captains : SafeCaptain[] = [];
            cpts.forEach(cpt => {
                captains.push(SafeCaptain.transformCaptainToSafe(cpt))
            }) 
            return captains;
        });
    }

    /**
     * Cette méthode retourne un capitaine enregistré
     * dans la base de données de manière safe en fonction 
     * de son id
     * @param id 
     * @returns 
     */
    async findById(id : string) {
        const captain = this.captainModel.findById(id).then((cpt) => {
            return SafeCaptain.transformCaptainToSafe(cpt)
        });
        return captain;
    }

    /**
     * Cette méthode permet de supprimer un capitaine de
     * la base de données en fonction de son id et retourne
     * le capitaine supprimé de manière safe
     * @param id 
     * @returns 
     */
    async delete(id: string) {
        return this.captainModel.findByIdAndRemove(id, {}, (err, deletedCaptain) => {
            if(err) {
                //LOG error, throw error
            }
            return SafeCaptain.transformCaptainToSafe(deletedCaptain)
        }).clone();
    }

    /**
     * Cette méthode permet de modifier un capitaine enregistré
     * dans la base de données et le retourne
     * @param id 
     * @param newCaptain 
     * @returns 
     */
    async update(id: string, newCaptain : Captain) : Promise<Captain> {
        newCaptain.updatedDate = new Date();
        return this.captainModel.findByIdAndUpdate(id, newCaptain, {new: true}, (err, updatedCaptain) => {
            if(err) {
                //LOG error, throw error
            }
            return updatedCaptain
        });
    }
        
}
