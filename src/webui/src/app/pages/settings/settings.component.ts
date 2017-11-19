import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ConfigService} from '../../services/config.service';
import {MatSnackBar} from '@angular/material';
import {LocalStorageService} from '../../services/local-storage.service';

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

  constructor(public title: Title, public configService: ConfigService,
              public snackBar: MatSnackBar, public localStorage: LocalStorageService) {
    this.checkProfileUrl = 'ci01.dolphin.lexisnexisrisk.com/cgi-bin/checkprofile.py';
    this.jiraDomain = 'https://jira.rsi.lexisnexis.com';
  }

  ngOnInit() {
    this.title.setTitle(this.TITLE);
    this.sprint = this.configService.getSprint();
  }

  applyChanges() {
    this.configService.setSprint(this.sprint);

    // Empty temp data
    this.snackBar.open('Change is applied sucessfully!', null, {
      duration: 1500,
      extraClasses: ['snack-bar', 'success']
    });
  }

}
