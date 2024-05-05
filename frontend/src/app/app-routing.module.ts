import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EpisodesComponent } from './components/episodes/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './components/episodes/episode-detail/episode-detail.component';
import { EpisodeAddComponent } from './components/episodes/episode-add/episode-add.component';
import { EpisodeDeleteComponent } from './components/episodes/episode-delete/episode-delete.component';
import { EpisodesPieChartComponent } from './components/episodes/episodes-pie-chart/episodes-pie-chart.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { LoginComponent } from './components/users/login/login.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'detail/:title', component: EpisodeDetailComponent, canActivate: [AuthGuard] },
  { path: 'episodes/delete/:title', component: EpisodeDeleteComponent, canActivate: [AuthGuard] },
  { path: 'episodes', component: EpisodesComponent, canActivate: [AuthGuard] },
  { path: 'episodes/add', component: EpisodeAddComponent, canActivate: [AuthGuard] },
  { path: 'episodes/pie-chart', component: EpisodesPieChartComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
