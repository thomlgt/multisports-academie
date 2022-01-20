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
    async create(@Body() createEvent : CreateEvent) : Promise<Event> {
        //Transformation du DTO createEvent en Event
        let event : Event = plainToInstance(Event, createEvent);
        event.createdDate = new Date();
        event.updatedDate = new Date();
        const createdEvent = new this.eventModel(event);
        return createdEvent.save();
    }

    /**
     * Cette méthode retourne tous les événements
     * enregistrés dans la base de données de manière safe
     * @returns 
     */
    async findAll() : Promise<Event[]> {
        return this.eventModel.find();
    }

    /**
     * Cette méthode retourne un événement enregistré
     * dans la base de données de manière safe en fonction 
     * de son id
     * @param id 
     * @returns 
     */
    async findById(id : string) : Promise<Event> {
        const event = this.eventModel.findById(id);
        if(!event) {
            //Log error, throw error
        }
        return event
    }

    /**
     * Cette méthode permet de supprimer un événement de
     * la base de données en fonction de son id et retourne
     * le événement supprimé de manière safe
     * @param id 
     * @returns 
     */
    async delete(id: string) : Promise<Event> {
        return this.eventModel.findByIdAndRemove(id, {}, (err, deletedEevnt) => {
            if(err) {
                //LOG error, throw error
            }
            return deletedEevnt
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
