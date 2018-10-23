import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contacts.service';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  question: String;
  limit = 2000;
  referer: string; url: string;
  ip: string; lat: number; lon: number; city: string; zip: string; country: string;
  agent: DeviceInfo; device: string;
  fields = 'country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,reverse,mobile,proxy,query,status,message';

  constructor(private formBuilder: FormBuilder, private router: Router, private contact: ContactService,
    private translate: TranslateService, public eventsService: EventsService,
    private cookieService: CookieService,
    private http: HttpClient,
    private deviceService: DeviceDetectorService,
    @Inject(DOCUMENT) private document: any) {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['']
    });
   }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  // convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.contactForm.invalid) {
            return;
        }

    this.contact.sendContact(this.contactForm.value.email, this.translate.getBrowserLang(),
    this.contactForm.value.message).subscribe(res => {
      if (res.message === 'Mail sent') {
        this.userAnalytics().then(() => {
          this.eventsService.sendEvent(
            this.cookieService.get('auid'), 'contact',
            this.ip, this.agent, this.device, this.referer, this.url, this.lat, this.lon, this.city, this.zip, this.country);
        }).then(() => {
          this.router.navigate(['/']);
        });
      }
    });
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
