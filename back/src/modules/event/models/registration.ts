import { Prop } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Score } from "./score";

export class Registration {

    @Prop()
    @IsNotEmpty()
    teamId: string;
    @Prop()
    @IsNotEmpty()
    validationStatus: string;
    @Prop()
    scores: Score[];

    constructor(partial: Partial<Registration>) {
        Object.assign(this, partial);
    }
}
