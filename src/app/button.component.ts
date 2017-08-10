import { Component, Input, OnInit } from '@angular/core';

// import { ButtonColors } from './ButtonColors';
@Component({
    selector: 'game-button',
    template: `
    <button (click)="onInput()" class="btn col-xs-6" [ngClass]="classes">{{buttonColor}}</button>
    `,
    styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
    @Input() buttonColor: string;
    sound: HTMLAudioElement;
    classes: string;

    ngOnInit(): void {
        this.classes = this.buttonColor;
        this.sound = new Audio(`assets/simonSound-${this.buttonColor}.mp3`);
    }

    onInput(): void {
        this.playSound();
        this.illuminateButton();
    }

    playSound(): void {
        this.sound.pause();
        this.sound.currentTime = 0;
        this.sound.play();
    }

    illuminateButton(): void {
        this.classes = this.classes.replace(' active', '');
        this.classes += ' active';
        this.sound.onended = () => this.classes = this.classes.replace(' active', '');
    }

}
