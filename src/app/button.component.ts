import { Component, Input, OnInit } from '@angular/core';
import { StateManagerService } from './state-manager.service';

// import { ButtonColors } from './ButtonColors';
@Component({
    selector: 'game-button',
    template: `
    <button (click)="userInput()" class="btn col-xs-6" [ngClass]="classes">{{buttonColor}}</button>
    `,
    styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
    @Input() buttonColor: string;
    sound: HTMLAudioElement;
    classes: string;

    constructor(private stateManager: StateManagerService) { }

    ngOnInit(): void {
        this.stateManager.gameInputs.push(this);
        this.classes = this.buttonColor;
        this.sound = new Audio(`assets/simonSound-${this.buttonColor}.mp3`);
    }

    public activate(): void {
        this.playSound();
        this.illuminateButton();
    }

    private userInput(): void {
        if (this.stateManager.listeningUsersInput) {
            this.activate();
            this.stateManager.userInputEvent.emit(this.buttonColor);
        }
    }

    private playSound(): void {
        this.sound.pause();
        this.sound.currentTime = 0;
        this.sound.play();
    }

    private illuminateButton(): void {
        this.classes = this.classes.replace(' active', '');
        this.classes += ' active';
        this.sound.onended = () => this.classes = this.classes.replace(' active', '');
    }

}
