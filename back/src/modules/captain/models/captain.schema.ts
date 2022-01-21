import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import { Document } from "mongoose";

export type CaptainDocument = Captain & Document;

@Schema()
export class Captain {

    _id: string
    @Prop()
    @IsNotEmpty()
    firstname: string;
    @Prop()
    @IsNotEmpty()
    lastname: string;
    @Prop()
    @IsEmail()
    email: string;
    @Prop()
    @IsNotEmpty()
    password: string;
    @Prop()
    @IsNotEmpty()
    phone: string;
    @Prop()
    @IsDateString()
    birthdate: Date;
    @Prop()
    @IsNumber()
    gender: number;
    @Prop()
    createdDate: Date;
    @Prop()
    updatedDate: Date;

    constructor(partial: Partial<Captain>) {
        Object.assign(this, partial);
    }
}
export const CaptainSchema = SchemaFactory.createForClass(Captain);
