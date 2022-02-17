import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Captain, CaptainDocument } from './entities/captain.entity';
import { SafeCaptain } from './dto/safe-captain.dto';
import { classToPlain, instanceToPlain, plainToInstance } from 'class-transformer';
import { CreateCaptain } from './dto/create-captain.dto';
import { CaptainNoPass } from './dto/captain-nopass.dto';
import { UpdatePersonalCaptain } from './dto/update-personal-captain.dto';

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
        const captain = await this.captainModel.findById(id);
        if(!captain) {
            throw new NotFoundException("Le capitaine est introuvable")
        }
        return CaptainNoPass.transformCaptainToNoPass(captain);
    }

    /**
     * Cette méthode retourne un capitaine enregistré
     * dans la base de données en fonction 
     * de son email
     * @param email 
     * @returns 
     */
     async findByEmail(email : string) {
        return this.captainModel.findOne({email : email});
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
     * Cette méthode permet de modifier les informations personnelles d'un 
     * capitaine enregistré dans la base de données et 
     * le retourne
     * @param id 
     * @param captain 
     * @returns 
     */
    async updatePersonalInfos(id: string, captain : UpdatePersonalCaptain) {
        const updatedCaptain = await this.captainModel.findByIdAndUpdate(
            id, 
            {
                firstname : captain.firstname,
                lastname : captain.lastname,
                phone : captain.phone,
                email : captain.email, 
                updatedDate: new Date()
            }, 
            {new: true},
            err => {
                return err
            }
        ).clone();
        if(!updatedCaptain) {
            throw new NotFoundException("Le capitaine est introuvable")
        }
        return CaptainNoPass.transformCaptainToNoPass(updatedCaptain);
    }
        
}
