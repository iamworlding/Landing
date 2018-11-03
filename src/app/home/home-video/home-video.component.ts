import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.css']
})
export class HomeVideoComponent implements OnInit {
  public id: any;
  private player;
  public width: any;
  public height: any;

  private id_ES = 'I85cSsz6PeY';
  private id_EN = 'Nqbi8Lui8tk';

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    if (this.translate.getBrowserLang() === 'es') {
      this.id = this.id_ES;
    } else {
      this.id = this.id_EN;
    }
    this.width = window.innerWidth * 0.6;
    this.height = window.innerWidth * 0.4;
  }

  savePlayer(player) {
    this.player = player;
  }
  onStateChange(event) {
  }


}

