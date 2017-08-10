import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //  templateUrl: './app.component.html',
  template: `
  <div class="row">
    <div class="col-xs-12 col-sm-8 col-sm-offset-2">
      <h1>{{title}}</h1>
      <span>by Brett </span>
      <app-game></app-game>
    </div>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Memory-game';
}
