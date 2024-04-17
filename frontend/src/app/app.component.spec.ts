import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EpisodeDetailComponent } from './components/episodes/episode-detail/episode-detail.component';
import { EpisodesComponent } from './components/episodes/episodes-list/episodes-list.component';
import { EpisodeAddComponent } from './components/episodes/episode-add/episode-add.component';
import { EpisodeDeleteComponent } from './components/episodes/episode-delete/episode-delete.component';
import { EpisodesPieChartComponent } from './components/episodes/episodes-pie-chart/episodes-pie-chart.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        NgxPaginationModule],
      declarations: [AppComponent,
        DashboardComponent,
        EpisodesComponent,
        EpisodeDetailComponent,
        EpisodeAddComponent,
        EpisodeDeleteComponent,
        EpisodesPieChartComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
