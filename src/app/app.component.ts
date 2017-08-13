import { Component } from '@angular/core';
import { StateManagerService } from './state-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ StateManagerService ]
})
export class AppComponent {
  title = 'Memory-game';
}
