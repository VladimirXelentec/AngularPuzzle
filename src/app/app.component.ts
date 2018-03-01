import { Component } from '@angular/core';

import '../public/scss/styles.scss';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

@Component({
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent { appName = 'Angular Puzzle'; }
