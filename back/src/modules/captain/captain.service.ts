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

    async create(@Body() createCaptain : CreateCaptain) : Promise<Captain> {
        //Transformation du DTO createCaptain en Captain
        let captain : Captain = plainToInstance(Captain, createCaptain);
        captain.createdDate = new Date();
        captain.updatedDate = new Date();
        const createdCaptain = new this.captainModel(captain);
        return createdCaptain.save();
    }

    async findAll() : Promise<Captain[]> {
        return this.captainModel.find();
    }

    async findById(id : string) : Promise<Captain> {
        const captain = this.captainModel.findById(id);
        if(!captain) {
            //Log error, throw error
        }
        return captain
    }

    async delete(id: string) : Promise<Captain> {
        return this.captainModel.findByIdAndRemove(id, {}, (err, deletedCaptain) => {
            if(err) {
                //LOG error, throw error
            }
            return deletedCaptain
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
