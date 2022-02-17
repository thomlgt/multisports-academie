import { Registration } from "./registration";

export class CreateEvent {

    name: string;
    startEvent: Date;
    endEvent: Date;
    startRegistration: Date;
    endRegistration: Date;
    minMembers: number;
    maxMembers: number;
    minAge: number;
    price: number;
    maxTeams: number;
    mainPicture: string; // TODO Picture
    gallery: string[]; // TODO Picture
    activities: string[]; // TODO Activity
    registrations: Registration[];

}