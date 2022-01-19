import { Prop } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCaptain {

    @Prop()
    @IsNotEmpty()
    @Expose()
    firstname: string;
    @Prop()
    @IsNotEmpty()
    @Expose()
    lastname: string;
    @Prop()
    @IsEmail()
    @Expose()
    email: string;
    @Prop()
    @IsNotEmpty()
    @Expose()
    password: string;
    @Prop()
    @IsNotEmpty()
    @Expose()
    phone: string;
    @Prop()
    @IsNotEmpty()
    @Expose()
    birthdate: Date;
    @Prop()
    @IsNumber()
    @Expose()
    gender: number;
}