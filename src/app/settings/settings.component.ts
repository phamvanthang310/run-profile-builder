import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CoreService} from '../services/core.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  checkProfileUrl: string;
  sprint: string;
  jiraDomain: string;

  constructor(private title: Title, private coreService: CoreService) {
    this.checkProfileUrl = '/cgi-bin/checkprofile.py';
    this.sprint = 'Dolphin 2017.S7.2';
    this.jiraDomain = '/rest/api/2/search';
  }

  ngOnInit() {
    this.title.setTitle('Settings');
    this.coreService.fetchJira(this.jiraDomain, this.sprint).subscribe(s => {
      console.log(s);
    });
  }

}
