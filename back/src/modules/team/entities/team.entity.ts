import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Document, SchemaTypes } from "mongoose";
import { Captain } from "src/modules/captain/entities/captain.entity";
import { Member } from "./member";

export type TeamDocument = Team & Document;

@Schema()
export class Team {

    _id: string
    @Prop()
    @IsNotEmpty()
    name: string;
    @Prop({type: SchemaTypes.ObjectId, ref: Captain.name})
    @IsNotEmpty()
    captain: Captain;
    @Prop()
    members: Member[];
    @Prop()
    createdDate: Date;
    @Prop()
    updatedDate: Date;

    constructor(partial: Partial<Team>) {
        Object.assign(this, partial);
    }
}
export const TeamSchema = SchemaFactory.createForClass(Team);
