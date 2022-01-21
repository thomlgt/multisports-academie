import { Prop } from "@nestjs/mongoose";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SchemaTypes } from "mongoose";
import { Picture } from "src/modules/picture/models/picture.schema";
import { Registration } from "../models/registration";

export class CreateEvent {

    @IsNotEmpty()
    name: string;
    @IsDateString()
    startEvent: Date;
    @IsDateString()
    endEvent: Date;
    @IsDateString()
    startRegistration: Date;
    @IsDateString()
    endRegistration: Date;
    @IsNumber()
    minMembers: number;    
    @IsNumber()
    maxMembers: number;    
    @IsNumber()
    minAge: number;    
    @IsNumber()
    price: number;    
    @IsNumber()
    maxTeams: number;
    @Prop({type: SchemaTypes.ObjectId, ref: Picture.name})
    picture: Picture;    
    gallery: Picture[];    
    activities: string[];    
    registrations: Registration[];

}