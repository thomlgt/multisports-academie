import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateEmailCaptain {
    @IsNotEmpty()
    @IsEmail()
    email: string;
}