import { Activity } from "../activity/activity.model";
import { Picture } from "../picture/picture.model";
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
    mainPicture: Picture;
    gallery: Picture[];
    activities: Activity[];
    registrations: Registration[];

}