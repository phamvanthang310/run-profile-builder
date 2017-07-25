import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentViewerComponent} from './component-viewer/component-viewer.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AppRoutingModule} from './app.routing.module';
import {SettingsComponent} from './settings/settings.component';
import {FormsModule} from '@angular/forms';
import {CoreService} from './services/core.service';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ComponentViewerComponent,
    ErrorPageComponent,
    SettingsComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    CoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
