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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ComponentViewerComponent,
    ErrorPageComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
