import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCaptain {

    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    lastname: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    birthdate: Date;
    @IsNumber()
    gender: number;
}