import { Event } from '../models/event.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class EventsService {

  constructor(private http: HttpClient) {}

  sendEvent(typeEvent: string) {
    const event: Event = {uid: null, origin: 'landingPage', type: typeEvent, date: new Date()};
    this.http.post<{message: string}>('http://localhost:3000/api/event', event)
      .subscribe((responseData) => {
        console.log(responseData.message);
      });
  }
}
