import {Component} from 'angular2/core';

@Component({
    selector:'[data-bar-chart]',
    templateUrl: 'templates/pmBarChart.html'
})
export class BarChartComponent{
    bars = [1,1]
}