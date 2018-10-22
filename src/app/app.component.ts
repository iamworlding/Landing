import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  cookieExists: boolean;
  referer: string; url: string;
  ip: string; lat: number; lon: number; city: string; zip: string; country: string;
  agent: DeviceInfo; device: string;
  fields = 'country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,reverse,mobile,proxy,query,status,message';

  constructor(
    private translate: TranslateService,
    private cookieService: CookieService,
    public eventsService: EventsService,
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
  }

  ngOnInit() {
    // Check cookies
    if (this.cookieService.check('auid')) {
      this.userAnalytics().then(() => {
        this.eventsService.sendEvent(
          this.cookieService.get('auid'), 'visit',
          this.ip, this.agent, this.device, this.referer, this.url, this.lat, this.lon, this.city, this.zip, this.country);
      });
    } else {
      this.userAnalytics().then(() => {
        this.eventsService.sendEvent(
          '-1', 'visit',
          this.ip, this.agent, this.device, this.referer, this.url, this.lat, this.lon, this.city, this.zip, this.country);
      });
    }
  }

  userAnalytics() {
    this.agent = this.deviceService.getDeviceInfo();
    if ( this.deviceService.isMobile() ) {
      this.device = 'mobile';
    } else if ( this.deviceService.isTablet() ) {
      this.device = 'tablet';
    } else if ( this.deviceService.isDesktop() ) {
      this.device = 'desktop';
    } else {
      this.device = 'unknown';
    }
    this.referer = this.document.referrer;
    this.url = this.document.URL;
    const promise = new Promise((resolve, reject) => {
      this.http
      .get<{ query: string, lat: number, lon: number, city: string, zip: string, country: string }>(
        'http://ip-api.com/json/?fields=' + this.fields)
        .toPromise()
        .then(res => { // Success
            this.ip = res.query;
            this.lat = res.lat;
            this.lon = res.lon;
            this.city = res.city;
            this.zip = res.zip;
            this.country = res.country;
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
    return promise;
  }
}
