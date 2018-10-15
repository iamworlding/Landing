import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  copyrightYear = new Date().getFullYear();
  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
