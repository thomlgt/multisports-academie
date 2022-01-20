import { IsNotEmpty } from "class-validator";

export class Member {
    @IsNotEmpty()
    firstname: string;
    @IsNotEmpty()
    lastname: string;
    @IsNotEmpty()
    gender: number;
    @IsNotEmpty()
    birthdate: Date;
}