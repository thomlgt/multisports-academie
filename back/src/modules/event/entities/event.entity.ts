import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Document, SchemaTypes } from "mongoose";
import { Picture } from "src/modules/picture/entities/picture.entity";
import { Registration } from "./registration";

export type EventDocument = Event & Document;

@Schema()
export class Event {

    _id: string
    @Prop()
    @IsNotEmpty()
    name: string;
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
    price: number;
    @Prop()
    @IsNumber()
    maxTeams: number;
    @Prop({type: SchemaTypes.ObjectId, ref: Picture.name})
    picture: Picture;
    @Prop()
    gallery: Picture[];
    @Prop()
    activities: string[];
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
