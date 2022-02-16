import { Prop } from "@nestjs/mongoose";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { SchemaTypes } from "mongoose";
import { Activity } from "src/modules/activity/entities/activity.entity";

export class Score {

    @Prop({type: 
        SchemaTypes.ObjectId, 
        ref: Activity.name
    })
    @IsNotEmpty()
    activity: Activity;
    @Prop()
    @IsNumber()
    points: number;

    constructor(partial: Partial<Score>) {
        Object.assign(this, partial);
    }
}
