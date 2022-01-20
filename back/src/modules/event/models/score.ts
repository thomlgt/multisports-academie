import { Prop } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class Score {

    @Prop()
    @IsNotEmpty()
    activityId: string;
    @Prop()
    @IsNumber()
    points: number;

    constructor(partial: Partial<Score>) {
        Object.assign(this, partial);
    }
}
