import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_DIALOG_DATA} from '@angular/material';
import {UtilsService} from "../services/utils.service";

@Component({
  selector: 'app-release-dialog',
  templateUrl: './release-dialog.component.html',
  styleUrls: ['./release-dialog.component.scss']
})
export class ReleaseDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public sanitizer: DomSanitizer, public utils: UtilsService) {
  }

  ngOnInit() {
  }

  copyToClipboard() {
    this.utils.copyToClipboard('.release-content');
  }
}
