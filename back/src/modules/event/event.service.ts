import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { Activity } from '../activity/entities/activity.entity';
import { MailService } from '../mail/mail.service';
import { CreateEventDto } from './dto/create-event.dto';
import { SafeEvent } from './dto/safe-event.dto';
import { Event, EventDocument } from './entities/event.entity';
import { Registration } from './entities/registration';

@Injectable()
export class EventService {

    constructor(
        @InjectModel(Event.name) private eventModel: Model<EventDocument>,
        private mailService : MailService
        ){}

    /**
     * Cette méthode permet de créer un événement
     * dans la base de données et renvoie un événement safe
     * @param createEventDto
     * @returns 
     */
    async create(@Body() createEventDto : CreateEventDto) {
        //Transformation du DTO CreateEventDto en Event
        const event : Event = plainToInstance(Event, createEventDto);
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
        let events = await this.eventModel.find().populate('place').populate('mainPicture').populate('gallery').populate('activities').populate('registrations');
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
        const event = await this.eventModel.findById(id)
            .populate('place')
            .populate('mainPicture')
            .populate('gallery')
            .populate({ 
                path: 'activities',
                populate: {
                  path: 'mainPicture',
                  model: 'Picture'
                } 
             })
            .populate('registrations');
        return SafeEvent.transformEventToSafe(event);
    }

    /**
     * Cette méthode retourne les événements enregistrés
     * dans la base de données de manière safe en fonction 
     * de l'id d'une équipe inscrite
     * @param id 
     * @returns 
     */
     async findByTeamRegistration(id : string) {
        const event = await this.eventModel.find({"registrations.team._id" : id}).populate('registrations');
        return event.map(SafeEvent.transformEventToSafe);
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

    /**
     * Cette méthode permet d'ajouter une inscritpion à un événement et 
     * d'enregistrer les changements dans la base de données
     * @param id 
     * @param registration
     * @returns 
     */
     async addRegistration(id: string, registration: Registration) {
        let captain = registration.team.captain;
        return await this.eventModel.findByIdAndUpdate(
            id, 
            {$push : {registrations: registration}, updatedDate: new Date()},
            {new: true},
            (error, event) => {
                SafeEvent.transformEventToSafe(event);
                this.mailService.sendAddRegistration(captain, event, registration);
            });
    }

    /**
     * Cette méthode permet de supprimer une inscritpion à un événement et 
     * d'enregistrer les changements dans la base de données
     * @param id 
     * @param registration
     * @returns 
     */
     async deleteRegistration(id: string, registration: Registration) {
        let captain = registration.team.captain;
        return this.eventModel.findByIdAndUpdate(
            id, 
            {$pull: {registrations: registration}, updatedDate: new Date()},
            {new: true},
            (error, event) => {
                SafeEvent.transformEventToSafe(event);
                this.mailService.sendDeleteRegistration(captain, event, registration);
            }).clone();   
    }

    /**
     * Cette méthode permet de modifier un événement enregistré pour valider une inscription
     * dans la base de données et le retourne
     * @param id 
     * @param registration
     * @returns 
     */
     async validateRegistration(id: string, registration : Registration) : Promise<Event> {
        let teamId = registration.team._id;
        let captain = registration.team.captain;
        return this.eventModel.findOneAndUpdate({_id : id, "registrations.team._id" : teamId},
            {$set: { "registrations.$.validationStatus" : "validated" }, updatedDate: new Date()},
            {new: true},
            (error, event) => {
                SafeEvent.transformEventToSafe(event);
                this.mailService.sendValidatedRegistration(captain, event, registration);
            }).clone();
    }

    /**
     * Cette méthode permet de modifier un événement enregistré dans la base de données 
     * et le retourne
     * @param id 
     * @param registration
     * @returns 
     */
        async updateRegistration(id: string, registration : Registration) : Promise<Event> {
        let teamId = registration.team._id;
        let captain = registration.team.captain;
        return this.eventModel.findOneAndUpdate({_id : id, "registrations.team._id" : teamId},
            {$set: { "registrations.$" : registration }, updatedDate: new Date()},
            {new: true},
            (error, event) => {
                SafeEvent.transformEventToSafe(event);
                this.mailService.sendValidatedRegistration(captain, event, registration);
            }).clone();
    }

}
