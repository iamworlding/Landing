import { Event } from '../models/event.model';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DeviceInfo } from 'ngx-device-detector';

@Injectable({providedIn: 'root'})
export class EventsService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  sendEvent(auid: string, typeEvent: string,
    ip: string, agent: DeviceInfo, referer: string, url: string, lat: number, lon: number, city: string, zip: string, country: string) {
    const user: User = {
      ip: ip, agent: agent, referer: referer, url: url, lat: lat, lon: lon, city: city, zip: zip, country: country};
    const event: Event = {auid: auid, origin: 'landingPage', type: typeEvent, date: new Date(), user};
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
