import {Component, Input, OnInit} from '@angular/core';
import {ReleaseBuilderService} from '../services/release-builder.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';
import {UtilsService} from "../services/utils.service";

@Component({
  selector: 'app-release-dialog',
  templateUrl: './release-dialog.component.html',
  styleUrls: ['./release-dialog.component.scss']
})
export class ReleaseDialogComponent implements OnInit {
  @Input() data: any;
  releaseContent: string;

  constructor(private releaseBuilderService: ReleaseBuilderService, private snackBar: MdSnackBar,
              public sanitizer: DomSanitizer, private utils: UtilsService) {
  }

  ngOnInit() {
    this.releaseContent = this.releaseBuilderService.buildRelease(this.data.sprint, this.data.runProfiles,
      this.data.issues, this.data.repos, this.data.isDbChange, this.data.isConfigChange);
  }

  copyToClipboard() {
    this.utils.copyToClipboard('.release-content');
  }
}
