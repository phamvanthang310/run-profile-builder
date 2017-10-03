import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {IndexComponent} from './pages/index/index.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentViewerComponent} from './component-viewer/component-viewer.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {AppRoutingModule} from './app.routing.module';
import {SettingsComponent} from './pages/settings/settings.component';
import {FormsModule} from '@angular/forms';
import {CoreService} from './services/core.service';
import {HttpModule} from '@angular/http';
import {ReleaseDialogComponent} from './release-dialog/release-dialog.component';
import {ReleaseBuilderService} from './services/release-builder.service';
import {PullRequestComponent} from './pages/pull-request/pull-request.component';
import {ConfigService} from './services/config.service';
import {LocalStorageService} from "./services/local-storage.service";
import {UtilsService} from "./services/utils.service";
import {QaDailyReportComponent} from "./pages/qa-daily-report/qa-daily-report.component";
import {QaDailyReportBuilderService} from "./services/qa-daily-report-builder.service";
import {DragulaModule} from 'ng2-dragula/ng2-dragula';
import {DraggableIssueListComponent} from "./draggable-issue-list/draggable-issue-list.component";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ComponentViewerComponent,
    ErrorPageComponent,
    SettingsComponent,
    ReleaseDialogComponent,
    PullRequestComponent,
    QaDailyReportComponent,
    DraggableIssueListComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragulaModule
  ],
  providers: [
    CoreService,
    ReleaseBuilderService,
    QaDailyReportBuilderService,
    LocalStorageService,
    ConfigService,
    UtilsService
  ],
  entryComponents: [
    ReleaseDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
