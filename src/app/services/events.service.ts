import { Event } from '../models/event.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class EventsService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  sendEvent(auid: string, typeEvent: string) {
    const event: Event = {auid: auid, origin: 'landingPage', type: typeEvent, date: new Date()};
    if (auid !== '-1') {
      this.http.post('http://localhost:3000/api/event', event)
      .subscribe();
    } else {
      this.http.post<{message: string, auid: string}>('http://localhost:3000/api/event', event)
      .subscribe((responseData) => {
        this.cookieService.set('auid', responseData.auid);
      });
    }
  }
}
