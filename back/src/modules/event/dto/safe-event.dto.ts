import { Activity } from 'src/modules/activity/entities/activity.entity';
import { Picture } from 'src/modules/picture/entities/picture.entity';
import { Event } from '../entities/event.entity';
import { Registration } from '../entities/registration';

export class SafeEvent {
    _id : string;
    name : string;
    startEvent : Date;
    endEvent : Date;
    startRegistration : Date;
    endRegistration : Date;
    minMembers : number;
    maxMembers : number;
    minAge : number;
    price : number;
    maxTeams: number;
    picture: Picture;
    gallery: Picture[];
    activities: Activity[];   
    registrations: Registration[];
    createdDate: Date;
    updatedDate: Date;

    constructor(_id: string, name: string, startEvent: Date, endEvent: Date, startRegistration: Date, endRegistration: Date, minMembers: number, maxMembers: number, minAge: number, price: number, maxTeams: number, picture: Picture, gallery: Picture[], activities: Activity[], registrations: Registration[]) {
        this._id = _id;
        this.name = name;
        this.startEvent = startEvent;
        this.endEvent = endEvent;
        this.startRegistration = startRegistration;
        this.endRegistration = endRegistration;
        this.minMembers = minMembers;
        this.maxMembers = maxMembers;
        this.maxMembers = minAge;
        this.price = price;
        this.maxTeams = maxTeams;
        this.picture = picture;
        this.gallery = gallery;
        this.activities = activities;
        this.registrations = registrations;
    }

    /**
     * Cette méthode permet de mapper un événement en événement
     * safe
     * @param event
     * @returns 
     */
    static transformEventToSafe(event : Event) {
        return new SafeEvent(event._id, event.name, event.startEvent, event.endEvent, event.startRegistration, event.endRegistration, event.minMembers, event.maxMembers, event.minAge, event.price, event.maxTeams, event.mainPicture, event.gallery, event.activities, event.registrations);
    }
    
}