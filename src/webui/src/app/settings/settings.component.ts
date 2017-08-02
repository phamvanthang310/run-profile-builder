import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {CoreService} from '../services/core.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  readonly TITLE = 'Settings';
  checkProfileUrl: string;
  sprint: string;
  jiraDomain: string;

  constructor(private title: Title, private coreService: CoreService) {
    this.checkProfileUrl = 'ci01.dolphin.lexisnexisrisk.com/cgi-bin/checkprofile.py';
    this.sprint = 'Dolphin 2017.S8.1';
    this.jiraDomain = 'https://jira.rsi.lexisnexis.com';
  }

  ngOnInit() {
    this.title.setTitle(this.TITLE);
  }

}
