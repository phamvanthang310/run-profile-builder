/**
 * Created by thangpham.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';
import {IndexComponent} from './index/index.component';
import {SettingsComponent} from './settings/settings.component';
import {PullRequestComponent} from './pull-request/pull-request.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: IndexComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'pulls', component: PullRequestComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
