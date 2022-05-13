import { Activity } from 'src/modules/activity/entities/activity.entity';
import { Picture } from 'src/modules/picture/entities/picture.entity';
import { Event } from '../entities/event.entity';
import { Place } from '../entities/place';
import { Registration } from '../entities/registration';
import { SafeRegistration } from './safe-registration.dto';

export class SafeEvent {
    _id : string;
    name : string;
    description: string;
    activitiesDetails: string;
    startEvent : Date;
    endEvent : Date;
    startRegistration : Date;
    endRegistration : Date;
    minMembers : number;
    maxMembers : number;
    minAge : number;
    minFemale: number;   
    price : number;
    maxTeams: number;
    place: Place;
    mainPicture: Picture;
    gallery: Picture[];
    activities: Activity[];   
    registrations: SafeRegistration[];
    createdDate: Date;
    updatedDate: Date;

    constructor(_id: string, name: string, description: string, activitiesDetails: string, startEvent: Date, endEvent: Date, startRegistration: Date, endRegistration: Date, minMembers: number, maxMembers: number, minAge: number, minFemale: number,price: number, maxTeams: number, place: Place,mainPicture: Picture, gallery: Picture[], activities: Activity[], registrations: SafeRegistration[]) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.activitiesDetails = activitiesDetails;
        this.startEvent = startEvent;
        this.endEvent = endEvent;
        this.startRegistration = startRegistration;
        this.endRegistration = endRegistration;
        this.minMembers = minMembers;
        this.maxMembers = maxMembers;
        this.minAge = minAge;
        this.minFemale = minFemale;
        this.price = price;
        this.maxTeams = maxTeams;
        this.place = place;
        this.mainPicture = mainPicture;
        this.gallery = gallery;
        this.activities = activities;
        this.registrations = registrations;
    }

    /**
     * Cette méthode permet de mapper un événement en événement safe
     * @param event
     * @returns 
     */
    static transformEventToSafe(event : Event) {
        let safeRegistrations: SafeRegistration[] = [];
        for (let registration of event.registrations) {
            safeRegistrations.push(SafeRegistration.transformRegistrationToSafe(registration));
        }        
        return new SafeEvent(
            event._id, 
            event.name, 
            event.description, 
            event.activitiesDetails, 
            event.startEvent, event.endEvent, 
            event.startRegistration, 
            event.endRegistration, 
            event.minMembers, 
            event.maxMembers, 
            event.minAge, 
            event.minFemale, 
            event.price, 
            event.maxTeams, 
            event.place, 
            event.mainPicture,
            event.gallery, 
            event.activities, 
            safeRegistrations
        );
    }
    
}