import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";

export class Place {

    @Prop()
    @IsNotEmpty()
    name: string;
    @Prop()
    address: string;
    @Prop()
    zipcode: string;
    @Prop()
    city: string;
    @Prop()
    phone: string;

    constructor(partial: Partial<Place>) {
        Object.assign(this, partial);
    }
}