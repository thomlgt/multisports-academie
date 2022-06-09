import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EventService } from './event.service';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/models/event/event';
import { Registration } from 'src/app/models/event/registration';

describe('EventService', () => {

  let service: EventService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // we use HTTP Testing Module to avoid doing real requests
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EventService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  /** fake Data */ 
  // Event
  let testId: string = 'testId'; 
  let testEvent: Event = new Event();
  let testListEvents = [
    new Event(), 
    new Event()
  ];
  // Team
  let testTeamId: string = 'testTeamId'; 
  // Activity
  let testActivityId: string = 'testActivityId';
  // Registration
  let testRegistration: Registration = new Registration();


  /** test findAll() */
  fdescribe('findAll()', () => {
    it('doit récupérer la liste des Events depuis le backend', () => {
      // subscribe to the observable which launch the request
      service.findAll().subscribe((result) => {
        // check if the result is conformed
        expect(result).toEqual(testListEvents);
      });
      // check if is the request has been lauch, if it's the correct url, if the method is the conformed one and if it sends a response
      let request = httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events`);
      expect(request.request.method).toEqual('GET');
      request.flush(testListEvents);
    });
  });

  /** test findById(:id) */ 
  fdescribe('findById(:id)', () => {
    it('doit récupérer la un Event en fonction de son id', () => {
      // subscribe to the observable which launch the request
      service.findById(testId).subscribe((result) => {
        // check if the result is conformed
        expect(result).toEqual(testEvent);
      });
      // check if is the request has been lauch, if it's the correct url, if the method is the conformed one and if it sends a response
      let request = httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events/${testId}`);
      expect(request.request.method).toEqual('GET');
      request.flush(testEvent);
    });
  });

  /** test findByTeamRegistration(:idTeam) */ 
  fdescribe('findByTeamRegistration(:idTeam)', () => {
    it('doit récupérer la liste des Events depuis le backend en fonction de l\'id d\'une Team', () => {
      // subscribe to the observable which launch the request
      service.findByTeamRegistration(testTeamId).subscribe((result) => {
        // check if the result is conformed
        expect(result).toEqual(testListEvents);
      });
      // check if is the request has been lauch, if it's the correct url, if the method is the conformed one and if it sends a response
      let request = httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events/team/${testTeamId}`);
      expect(request.request.method).toEqual('GET');
      request.flush(testListEvents);
    });
  });

  /** test findByActivity(:idActivity) */ 
  fdescribe('findByActivity(:idActivity)', () => {
    it('doit récupérer la liste des Events depuis le backend en fonction de l\'id d\'une Activity', () => {
      // subscribe to the observable which launch the request
      service.findByActivity(testActivityId).subscribe((result) => {
        // check if the result is conformed
        expect(result).toEqual(testListEvents);
      });
      // check if is the request has been lauch, if it's the correct url, if the method is the conformed one and if it sends a response
      let request = httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events/activity/${testActivityId}`);
      expect(request.request.method).toEqual('GET');
      request.flush(testListEvents);
    });
  });

  /** test addRegistration(:id, registration) */ 
  fdescribe('addRegistration(:id, registration)', () => {
    it('doit ajouter une Registration à un Event', () => {
      // subscribe to the observable which launch the request
      service.addRegistration(testId, testRegistration).subscribe((result) => {
        // check if the result is conformed
        expect(result).toEqual(testRegistration);
      });
      // check if is the request has been lauch, if it's the correct url, if the method is the conformed one and if it sends a response
      let request = httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events/${testId}/registrations`);
      expect(request.request.method).toEqual('POST');
      request.flush(testRegistration);
    });
  });

  /** test cancelRegistration(:id, registration) */ 
  fdescribe('cancelRegistration(:id, registration)', () => {
    it('doit supprimer une Registration d\'un Event', () => {
      // subscribe to the observable which launch the request
      service.cancelRegistration(testId, testRegistration).subscribe((result) => {
        // check if the result is conformed
        expect(result).toEqual(testRegistration);
      });
      // check if is the request has been lauch, if it's the correct url, if the method is the conformed one and if it sends a response
      let request = httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events/${testId}/registrations`);
      expect(request.request.method).toEqual('DELETE');
      request.flush(testRegistration);
    });
  });

  /** test validateRegistration(:id, registration) */ 
  fdescribe('validateRegistration(:id, registration)', () => {
    it('doit changer le statut d\'une Registration d\'un Event', () => {
      // subscribe to the observable which launch the request
      service.validateRegistration(testId, testRegistration).subscribe((result) => {
        // check if the result is conformed
        expect(result).toEqual(testRegistration);
      });
      // check if is the request has been lauch, if it's the correct url, if the method is the conformed one and if it sends a response
      let request = httpTestingController.expectOne((req) => req.url === `${environment.apiUrl}/events/${testId}/registrations`);
      expect(request.request.method).toEqual('PATCH');
      request.flush(testRegistration);
    });
  });

});
