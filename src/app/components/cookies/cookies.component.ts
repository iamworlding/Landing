import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {
  status = false;
  closeButton() {
    this.status = !this.status;
  }

  constructor() { }

  ngOnInit() {
  }

}
