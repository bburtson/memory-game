import { Component, Input } from '@angular/core';

// import { ButtonColors } from './ButtonColors';
@Component({
    selector: 'game-button',
    template: `
    <button class="btn col-xs-6" [ngClass]="buttonColor">{{buttonColor}}</button>
    `,
    styleUrls: [ './button.component.css' ]
})
export class ButtonComponent {
    @Input() buttonColor: string;
}
