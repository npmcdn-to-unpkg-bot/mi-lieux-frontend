import {Component} from 'angular2/core';
import {BarChartComponent} from './barchart.component'

@Component({
    selector: '[data-milieux-root]',
    templateUrl: 'templates/pmHomePage.html',
    directives: [BarChartComponent]
})
export class AppRootComponent {

}