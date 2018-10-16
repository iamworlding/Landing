import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { EventsService } from './services/events.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  cookieExists: boolean;

  constructor(private translate: TranslateService,
    private router: Router,
    private cookieService: CookieService,
    public eventsService: EventsService) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

    // Check cookies
    if (this.cookieService.check('auid')) {
      this.eventsService.sendEvent(this.cookieService.get('auid'), 'webVisit');
    } else {
      this.eventsService.sendEvent('-1', 'webVisit');
    }
  }

  ngOnInit() {
  }


}
