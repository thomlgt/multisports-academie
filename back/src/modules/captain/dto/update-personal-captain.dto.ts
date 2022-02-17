import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdatePersonalCaptain {
    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    lastname: string;
    @IsNotEmpty()
    phone: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}