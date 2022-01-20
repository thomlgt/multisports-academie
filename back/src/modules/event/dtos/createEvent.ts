import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Registration } from "../models/registration";

export class CreateEvent {

    @IsNotEmpty()
    name: string;
    @IsDateString()
    startEvent: Date;
    @IsDateString()
    endEvent: Date;
    @IsDateString()
    startRegistration: Date;
    @IsDateString()
    endRegistration: Date;
    @IsNumber()
    minMembers: number;    
    @IsNumber()
    maxMembers: number;    
    @IsNumber()
    minAge: number;    
    @IsNumber()
    price: number;    
    @IsNumber()
    maxTeams: number;    
    @IsDateString()
    createdDate: Date;    
    @IsDateString()
    updatedDate: Date;
    @IsString()
    pictureId: string;
    
    galery: string[];
    
    activities: string[];
    
    registrations: Registration[];

}