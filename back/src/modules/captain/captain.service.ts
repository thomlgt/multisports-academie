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

    async findAll() {
        return this.captainModel.find().then((cpts) => {
            let captains : SafeCaptain[] = [];
            cpts.forEach(cpt => {
                captains.push(SafeCaptain.transformCaptainToSafe(cpt))
            }) 
            return captains;
        });
    }

    async findById(id : string) {
        const captain = this.captainModel.findById(id).then((cpt) => {
            return SafeCaptain.transformCaptainToSafe(cpt)
        });
        return captain;
    }

    async delete(id: string) {
        return this.captainModel.findByIdAndRemove(id, {}, (err, deletedCaptain) => {
            if(err) {
                //LOG error, throw error
            }
            return SafeCaptain.transformCaptainToSafe(deletedCaptain)
        }).clone();
    }

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
