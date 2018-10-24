import { Event } from '../models/event.model';
import { UserEvent } from '../models/userevent.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { DeviceInfo } from 'ngx-device-detector';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/event/';

@Injectable({providedIn: 'root'})
export class EventsService {
  d = new Date();
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  yearDate: string;
  monthDate: string;
  dayDate: string;
  hoursDate: string;
  minutesDate: string;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.yearDate = this.getYear();
    this.monthDate = this.getMonth();
    this.dayDate = this.getDay();
    this.hoursDate = this.getHours();
    this.minutesDate = this.getMinutes();
  }

  sendEvent(auid: string, typeEvent: string, ip: string, agent: DeviceInfo,
    device: string , referer: string, url: string, lat: number, lon: number, city: string, zip: string, country: string) {
    const user: UserEvent = {
      ip: ip, agent: agent, device: device, referer: referer, url: url, lat: lat, lon: lon, city: city, zip: zip, country: country};
    const event: Event = {auid: auid, origin: 'landingPage', type: typeEvent,
    date: this.yearDate + '/' + this.monthDate + '/' + this.dayDate + ' ' + this.hoursDate + ':' + this.minutesDate,
    date_int: parseInt(this.yearDate + this.monthDate + this.dayDate, 10), user};
    if (auid !== '-1') {
      this.http.post(BACKEND_URL, event)
      .subscribe();
    } else {
      this.http.post<{message: string, auid: string}>(BACKEND_URL, event)
      .subscribe((responseData) => {
        this.cookieService.set('auid', responseData.auid);
      });
    }
  }

  getYear() {
    return String(this.d.getFullYear());
  }
  getMonth() {
    return String(this.month[this.d.getMonth()]);
  }
  getDay() {
    if ( String(this.d.getDate()).length === 1 ) {
      return String('0' + this.d.getDate());
    } else {
      return String(this.d.getDate());
    }
  }
  getHours() {
    if ( String(this.d.getHours()).length === 1 ) {
      return String('0' + this.d.getHours());
    } else {
      return String(this.d.getHours());
    }
  }
  getMinutes() {
    if ( String(this.d.getMinutes()).length === 1 ) {
      return String('0' + this.d.getMinutes());
    } else {
      return String(this.d.getMinutes());
    }
  }
}
