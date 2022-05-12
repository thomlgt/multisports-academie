import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EventService } from './event.service';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/models/event/event';

describe('EventService', () => {

  let service: EventService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      /**
      * On va utiliser le HTTP Testing Module qui nous évite de réellement faire des requêtes
      */
          imports: [HttpClientTestingModule]
      });
      service = TestBed.inject(EventService);
      /**
      * L'HTTP Testing Controller nous est fourni par le Testing Module et nous fourni des méthodes pour mocker des requêtes
      */
     httpTestingController = TestBed.inject(HttpTestingController);
  });

  let listEvents = [
    new Event(), 
    new Event()
  ];

  fdescribe('findAll()', () => {
    it('doit récupérer la liste des Events depuis le backend', () => {
        // 1. On souscrit à l'observable qui lance la requête
        service.findAll().subscribe((result) => {
            // 3. On vérifie que le résultat correspond à ce qui est attendu
            expect(result).toEqual(listEvents);
        });
        // 2. L'HTTP Testing Controller vérifie que la requête a été lancée, qu'elle correspond à l'URL donnée et renvoie une réponse
            httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events`)
                .flush(listEvents);
    });

  });

});
