import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { EventsService } from '../services/events.service';
import { nextTick } from 'q';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})

export class JoinComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    joinTerms = false;
    copyrightYear = new Date().getFullYear();
    referer: string; url: string;
    ip: string; lat: number; lon: number; city: string; zip: string; country: string;
    agent: DeviceInfo; device: string;
    fields = 'country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,reverse,mobile,proxy,query,status,message';


    constructor(private formBuilder: FormBuilder,
      private router: Router,
      private translate: TranslateService,
      private user: UserService, public eventsService: EventsService,
      private cookieService: CookieService,
      private http: HttpClient,
      private deviceService: DeviceDetectorService,
      @Inject(DOCUMENT) private document: any) { }

    ngOnInit() {
      window.scrollTo(0, 0);
      this.registerForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.user.userJoin(this.registerForm.value.name, this.registerForm.value.email).subscribe(res => {
          if (res.message === 'Register completed') {
            this.userAnalytics().then(() => {
              this.eventsService.sendEvent(
                this.cookieService.get('auid'), 'join',
                this.ip, this.agent, this.device, this.referer, this.url, this.lat, this.lon, this.city, this.zip, this.country);
                return;
            }).then(() => {
              this.router.navigate(['/']);
            });
          }
        });

    }

    activateJoinButton() {
      this.joinTerms = !this.joinTerms;
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

