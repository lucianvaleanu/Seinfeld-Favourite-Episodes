import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";


import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EpisodeDetailComponent } from './components/episodes/episode-detail/episode-detail.component';
import { EpisodeAddComponent } from './components/episodes/episode-add/episode-add.component';
import { EpisodeDeleteComponent } from './components/episodes/episode-delete/episode-delete.component';
import { EpisodesComponent } from './components/episodes/episodes-list/episodes-list.component';
import { EpisodesPieChartComponent } from './components/episodes/episodes-pie-chart/episodes-pie-chart.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxPaginationModule } from 'ngx-pagination';

import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsListComponent } from './components/reviews/reviews-list/reviews-list.component';
import { ReviewsAddComponent } from './components/reviews/reviews-add/reviews-add.component';
import { ReviewsUpdateComponent } from './components/reviews/reviews-update/reviews-update.component';
import { ReviewDeleteComponent } from './components/reviews/review-delete/review-delete.component';
import { SignupComponent } from './components/users/signup/signup.component';
import { LoginComponent } from './components/users/login/login.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
    declarations: [
        AppComponent,
        EpisodesComponent,
        EpisodeDetailComponent,
        EpisodeAddComponent,
        EpisodeDeleteComponent,
        EpisodesPieChartComponent,
        ReviewsListComponent,
        ReviewsAddComponent,
        ReviewsUpdateComponent,
        ReviewDeleteComponent,
        SignupComponent,
        LoginComponent
    ],
    providers: [
        provideHttpClient(withFetch()),
        provideClientHydration(),
        { provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        HttpClientModule,
        NgbDropdownModule
    ]
})
export class AppModule { }
