import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { JoinComponent } from './join/join.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HeaderComponent } from './components/header/header.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeWhatComponent } from './home/home-what/home-what.component';
import { HomeWhyComponent } from './home/home-why/home-why.component';
import { HomeWhereComponent } from './home/home-where/home-where.component';
import { HomeColaborateComponent } from './home/home-colaborate/home-colaborate.component';
import { AboutCookiesComponent } from './about-cookies/about-cookies.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { SecurityComponent } from './security/security.component';
import { HomeIntroComponent } from './home/home-intro/home-intro.component';
import { ContactComponent } from './contact/contact.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoinComponent,
    NotFoundComponent,
    HeaderComponent,
    CookiesComponent,
    FooterComponent,
    HomeWhatComponent,
    HomeWhyComponent,
    HomeWhereComponent,
    HomeColaborateComponent,
    AboutCookiesComponent,
    PrivacyComponent,
    TermsComponent,
    SecurityComponent,
    HomeIntroComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPayPalModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
