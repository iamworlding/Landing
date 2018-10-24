import { User } from '../models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/join/';

@Injectable({providedIn: 'root'})
export class UserService {
  d = new Date();
  month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  yearDate: string;
  monthDate: string;
  dayDate: string;
  hoursDate: string;
  minutesDate: string;
  dataUser: any;

  constructor(private http: HttpClient, private cookieService: CookieService, private translate: TranslateService) {
    this.yearDate = this.getYear();
    this.monthDate = this.getMonth();
    this.dayDate = this.getDay();
    this.hoursDate = this.getHours();
    this.minutesDate = this.getMinutes();
  }

  userJoin(name: string, email: string): Observable<Response> {
    const data = new Observable<Response>(observer => {
    const user: User = {auid: this.cookieService.get('auid'),
      name: name, email: email, language: this.translate.getBrowserLang(),
      date: this.yearDate + '/' + this.monthDate + '/' + this.dayDate + ' ' + this.hoursDate + ':' + this.minutesDate,
      date_int: parseInt(this.yearDate + this.monthDate + this.dayDate, 10)};
    this.http.post<{message: String}>(BACKEND_URL, user)
      .subscribe((responseData) => {
        this.dataUser = responseData;
        observer.next(this.dataUser);
      });
    });
    return data;
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
