import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CaptainDocument = Captain & Document;

@Schema()
export class Captain {

    _id: string
    @Prop({required: true})
    firstname: string;
    @Prop({required: true})
    lastname: string;
    @Prop({required: true})
    email: string;
    @Prop({required: true})
    password: string;
    @Prop({required: true})
    phone: string;
    @Prop({required: true})
    birthdate: Date;
    @Prop({required: true})
    gender: number;
    @Prop()
    createdDate: Date;
    @Prop()
    updatedDate: Date;
}
export const CaptainSchema = SchemaFactory.createForClass(Captain);
