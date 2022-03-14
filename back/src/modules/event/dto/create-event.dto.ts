import { Prop } from "@nestjs/mongoose";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SchemaTypes } from "mongoose";
import { Activity } from "src/modules/activity/entities/activity.entity";
import { Picture } from "src/modules/picture/entities/picture.entity";
import { Place } from "../entities/place";
import { Registration } from "../entities/registration";

export class CreateEventDto {

    @IsNotEmpty()
    name: string;
    description: string;
    activitiesDetails: string;
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
    place: Place;
    @Prop({
        type: SchemaTypes.ObjectId, 
        ref: Picture.name
    })
    mainPicture: Picture;    
    @Prop({
        type: [SchemaTypes.ObjectId], 
        ref: Picture.name})
    gallery: Picture[];
    @Prop({
        type: [SchemaTypes.ObjectId], 
        ref: Activity.name
    })  
    activities: Activity[];    
    registrations: Registration[];

}