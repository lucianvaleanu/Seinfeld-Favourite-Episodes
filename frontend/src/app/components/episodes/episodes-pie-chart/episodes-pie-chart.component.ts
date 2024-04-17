import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../../../services/episode.service';
import { Episode } from '../../../models/episode';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-episodes-pie-chart',
  templateUrl: './episodes-pie-chart.component.html',
  styleUrls: ['./episodes-pie-chart.component.css']
})
export class EpisodesPieChartComponent implements OnInit {

  seasonEpisodeCount: { name: string, value: number }[] = [];
  view: [number, number] = [700, 400];
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#fa2f2f', '#fa952f', '#c7fa2f', '#2ffa9b', '#2ff0fa', '#2f98fa', '#982ffa', '#e92ffa', '#fa2f62']
  };
  legendPosition: LegendPosition = LegendPosition.Right;

  pieChartData?: Object;

  constructor(private episodeService: EpisodeService) { }

  ngOnInit(): void {
    this.loadPieChartData();
  }

  loadPieChartData(): void {
    this.episodeService.getPieChartData().subscribe(
      (data: any) => {
        this.seasonEpisodeCount = Object.keys(data).map(season => ({
          name: `Season ${season}`,
          value: data[season]
        }));
      }
    );
  }

}
