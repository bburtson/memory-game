import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { BUTTONCOLORS } from './ButtonColors';


@Component({
    selector: 'app-game',
    template: `
    <div class="col-xs-12">
        <game-button *ngFor="let color of buttonColors"
                     [buttonColor]="color"
                     class="col-xs-6">
        </game-button>
    </div>
    `,

    styles: [`game-button.col-xs-6 { margin:0; padding:0; }`]
})
export class GameComponent {

    buttonColors = BUTTONCOLORS;

    powerOn = true;

    toggleOn(): void { this.powerOn = !this.powerOn; }

    start(): void {
        //
    }
}
