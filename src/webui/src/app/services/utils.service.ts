import {Injectable} from '@angular/core';
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";

@Injectable()
export class UtilsService {

  constructor(private snackBar: MdSnackBar) {
  }

  public copyToClipboard(selector: string): void {
    const node = document.querySelector(selector);
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNode(node);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();

    const snackBarConfig = new MdSnackBarConfig();
    snackBarConfig.extraClasses = ['snack-bar', 'success'];
    snackBarConfig.duration = 1500;

    this.displaySnackBarWithoutAction('Copied to clipboard!', snackBarConfig);
  }

  public displaySnackBarWithoutAction(message: string, config: MdSnackBarConfig = {}) {
    this.snackBar.open(message, null, config);
  }
}
