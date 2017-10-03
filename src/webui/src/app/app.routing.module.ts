/**
 * Created by thangpham.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {IndexComponent} from './pages/index/index.component';
import {SettingsComponent} from './pages/settings/settings.component';
import {PullRequestComponent} from './pages/pull-request/pull-request.component';
import {QaDailyReportComponent} from "./pages/qa-daily-report/qa-daily-report.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: IndexComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'pulls', component: PullRequestComponent},
  {path: 'qa-daily-report', component: QaDailyReportComponent},
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
