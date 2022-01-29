import { Prop } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { SchemaTypes } from "mongoose";
import { Team } from "src/modules/team/entities/team.entity";
import { Score } from "./score";

export class Registration {

    @Prop({type: SchemaTypes.ObjectId, ref: Team.name})
    @IsNotEmpty()
    team: Team;
    @Prop()
    @IsNotEmpty()
    validationStatus: string;
    @Prop()
    scores: Score[];

    constructor(partial: Partial<Registration>) {
        Object.assign(this, partial);
    }
}
