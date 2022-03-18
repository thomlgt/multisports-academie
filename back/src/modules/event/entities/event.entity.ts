import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Document, SchemaTypes } from "mongoose";
import { Activity } from "src/modules/activity/entities/activity.entity";
import { Picture } from "src/modules/picture/entities/picture.entity";
import { Place } from "./place";
import { Registration } from "./registration";

export type EventDocument = Event & Document;

@Schema()
export class Event {

    _id: string
    @Prop()
    @IsNotEmpty()
    name: string;
    @Prop()
    description: string;
    @Prop()
    activitiesDetails: string;
    @Prop()
    @IsDateString()
    startEvent: Date;
    @Prop()
    @IsDateString()
    endEvent: Date;
    @Prop()
    @IsDateString()
    startRegistration: Date;
    @Prop()
    @IsDateString()
    endRegistration: Date;
    @Prop()
    @IsNumber()
    minMembers: number;
    @Prop()
    @IsNumber()
    maxMembers: number;
    @Prop()
    @IsNumber()
    minAge: number;
    @Prop()
    @IsNumber()
    minFemale: number;
    @Prop()
    @IsNumber()
    price: number;
    @Prop()
    @IsNumber()
    maxTeams: number;
    @Prop()
    place: Place;
    @Prop({
        type: SchemaTypes.ObjectId, 
        ref: Picture.name
    })
    mainPicture: Picture;
    @Prop({
        type: [SchemaTypes.ObjectId], 
        ref: Picture.name
    })
    gallery: Picture[];
    @Prop({
        type: [SchemaTypes.ObjectId], 
        ref: Activity.name})
    activities: Activity[];
    @Prop()
    registrations: Registration[];
    @Prop()
    createdDate: Date;
    @Prop()
    updatedDate: Date;

    constructor(partial: Partial<Event>) {
        Object.assign(this, partial);
    }
}
export const EventSchema = SchemaFactory.createForClass(Event);
