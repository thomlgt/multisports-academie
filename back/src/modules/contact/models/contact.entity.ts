import { IsEmail, IsNotEmpty } from "class-validator";

export class Contact {

    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    lastname: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    subject: Date;
    @IsNotEmpty()
    message: number;
}