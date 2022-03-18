import { Activity } from "../activity/activity.model";
import { Picture } from "../picture/picture.model";
import { Place } from "./place";
import { Registration } from "./registration";

export class CreateEvent {

    name: string;
    description: string;
    activitiesDetails: string;
    startEvent: Date;
    endEvent: Date;
    startRegistration: Date;
    endRegistration: Date;
    minMembers: number;
    maxMembers: number;
    minAge: number;
    minFemale: number;
    price: number;
    maxTeams: number;
    place: Place;
    mainPicture: Picture;
    gallery: Picture[];
    activities: Activity[];
    registrations: Registration[];

}