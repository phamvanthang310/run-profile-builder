import {Component, Input, OnInit} from '@angular/core';
import {ReleaseBuilderService} from '../services/release-builder.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';

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
      this.data.issues, this.data.repos, this.data.isDbChange);
  }

  copyToClipboard() {
    this.makeSelectedRange();
    const config = new MdSnackBarConfig();
    config.extraClasses = ['snack-bar', 'success'];
    config.duration = 1500;

    this.snackBar.open('Copied to clipboard!', null, config);
  }

  private makeSelectedRange(): void {
    const node = document.getElementsByClassName('release-content').item(0);
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNode(node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  }
}
