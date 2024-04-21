import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

import { NgxPaginationModule} from 'ngx-pagination';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        EpisodesComponent,
        EpisodeDetailComponent,
        EpisodeAddComponent,
        EpisodeDeleteComponent,
        EpisodesPieChartComponent
    ],
    providers: [
        provideHttpClient(withFetch()),
        provideClientHydration()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        HttpClientModule,
        NgbDropdownModule
    ]
})
export class AppModule { }
