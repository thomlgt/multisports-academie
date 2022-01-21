import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateEvent } from './dtos/createEvent';
import { SafeEvent } from './dtos/safeEvent';
import { Event, EventDocument } from './models/event.schema';

@Injectable()
export class EventService {

    constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>){}

    /**
     * Cette méthode permet de créer un événement
     * dans la base de données et renvoie un événement safe
     * @param createEvent
     * @returns 
     */
    async create(@Body() createEvent : CreateEvent) {
        //Transformation du DTO createEvent en Event
        let event : Event = plainToInstance(Event, createEvent);
        event.createdDate = new Date();
        event.updatedDate = new Date();
        const createdEvent = new this.eventModel(event);
        // return createdEvent.save();
        return createdEvent.save().then((cpt) => {
            return SafeEvent.transformEventToSafe(cpt)
        });
    }

    /**
     * Cette méthode retourne tous les événements
     * enregistrés dans la base de données de manière safe
     * @returns 
     */
    async findAll() {
        let events = await this.eventModel.find();
        return events.map(SafeEvent.transformEventToSafe);
    }

    /**
     * Cette méthode retourne un événement enregistré
     * dans la base de données de manière safe en fonction 
     * de son id
     * @param id 
     * @returns 
     */
    async findById(id : string) {
        const event = await this.eventModel.findById(id);
        return SafeEvent.transformEventToSafe(event);
    }

    /**
     * Cette méthode permet de supprimer un événement de
     * la base de données en fonction de son id et retourne
     * le événement supprimé de manière safe
     * @param id 
     * @returns 
     */
    async delete(id: string) {
        return this.eventModel.findByIdAndRemove(id, {}, (err, deletedEvent) => {
            if(err) {
                //LOG error, throw error
            }
            return SafeEvent.transformEventToSafe(deletedEvent)
        }).clone();
    }

    /**
     * Cette méthode permet de modifier un événement enregistré
     * dans la base de données et le retourne
     * @param id 
     * @param newEvent 
     * @returns 
     */
    async update(id: string, newEvent : Event) : Promise<Event> {
        newEvent.updatedDate = new Date();
        return this.eventModel.findByIdAndUpdate(id, newEvent, {new: true}, (err, updatedEvent) => {
            if(err) {
                //LOG error, throw error
            }
            return updatedEvent
        });
    }

}
