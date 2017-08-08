import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //  templateUrl: './app.component.html',
  template: `
  <div class="col-xs-8 col-xs-offset-2">
    <h1>{{title}}</h1>
    <span>by Brett </span>
    <app-game></app-game>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Memory-game';
}
