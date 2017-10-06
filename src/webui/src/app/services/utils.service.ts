import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig} from "@angular/material";
import {ComponentType} from "@angular/cdk/portal";

@Injectable()
export class UtilsService {

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) {
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

    const snackBarConfig = new MatSnackBarConfig();
    snackBarConfig.extraClasses = ['snack-bar', 'success'];
    snackBarConfig.duration = 1500;

    this.displaySnackBarWithoutAction('Copied to clipboard!', snackBarConfig);
  }

  public displaySnackBarWithoutAction(message: string, config: MatSnackBarConfig = {}) {
    this.snackBar.open(message, null, config);
  }

  public openDialog(data: any, dialogComponent: ComponentType<any>) {
    let config: MatDialogConfig = new MatDialogConfig();
    config.width = '1000px';
    config.data = data;

    this.dialog.open(dialogComponent, config);
  }

  public getInstantDate(): string {
    return new Date().toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'});
  }
}
