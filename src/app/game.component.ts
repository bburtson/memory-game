import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { BUTTONCOLORS } from './ButtonColors';


@Component({
    selector: 'app-game',
    template: `
    <hr>
    <div class="col-xs-12">
        <game-button *ngFor="let color of buttonColors"
                     [buttonColor]="color"
                     class="col-xs-6">
        </game-button>
    </div>
    <div>
        <button class="btn" (click)="toggleGame()" [ngClass]="state">{{state}}</button>
    </div>
    `,

    styleUrls: [ 'game.component.css' ]
})
export class GameComponent {

    buttonColors = BUTTONCOLORS;
    state = 'off';
    powerOn = false;

    toggleGame(): void {
        this.powerOn = !this.powerOn;
        this.state = this.powerOn ? 'on' : 'off';
     }

    start(): void {
        //
    }
}
