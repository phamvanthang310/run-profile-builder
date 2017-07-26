import {Component, Input, OnInit} from '@angular/core';
import {ReleaseBuilderService} from '../services/release-builder.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-release-dialog',
  templateUrl: './release-dialog.component.html',
  styleUrls: ['./release-dialog.component.scss']
})
export class ReleaseDialogComponent implements OnInit {
  @Input() data: any;
  releaseContent: string;

  constructor(private releaseBuilderService: ReleaseBuilderService, private snackBar: MdSnackBar,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.releaseContent = this.releaseBuilderService.buildRelease(this.data.sprint, this.data.runProfiles,
      this.data.stories, this.data.repos);
  }

  copyToClipboard() {
    this.snackBar.open('Function is not supported yet!', null, {
      duration: 1500
    });
  }
}
