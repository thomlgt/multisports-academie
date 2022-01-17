import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CaptainDocument = Captain & Document;

@Schema()
export class Captain {

    _id: string
    @Prop()
    firstname: string;
    @Prop()
    lastname: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    phone: string;
    @Prop()
    birthdate: Date;
    @Prop()
    gender: number;
    @Prop()
    createdDate: Date;
    @Prop()
    updatedDate: Date;
}
export const CaptainSchema = SchemaFactory.createForClass(Captain);
