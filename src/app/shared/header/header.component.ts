import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  waveUsername: string[] = [];
  @Input() headerTitle:string = ''

  ngOnInit(): void {
    this.prepareWaveUserName();
  }

  prepareWaveUserName () {
    this.waveUsername = this.headerTitle.split('');
  }

}
