import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/timer';

import { StateManagerService } from './state-manager.service';
import { ButtonComponent } from './button.component';
import { BUTTONCOLORS } from './ButtonColors';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {

    private buttonColors = BUTTONCOLORS;
    private outputSequence: string[] = [];
    private sequenceCount:any = "&#9654;"
    private userInputsCount = 0;
    private incorrectSound: HTMLAudioElement;
    private victorySound: HTMLAudioElement;

    constructor(private stateManager: StateManagerService) { }

    ngOnInit(): void {
        this.incorrectSound = new Audio('assets/incorrect-sound.mp3');
        this.victorySound = new Audio('assets/victory-sound.mp3');
        this.stateManager.userInputEvent.subscribe((e) => { this.onUserInput(e); });
    }

    private addRandomSequenceColor(): void {
        const i = Math.floor(Math.random() * (this.buttonColors.length));
        this.outputSequence.push(this.buttonColors[i]);
    }

    private displaySequence(): void {
        const sub = Observable.timer(1500, 800).subscribe((count) => {
            if (count < this.outputSequence.length) {
                this.stateManager.userInputEnabled = false;
                this.getButtonComponent(this.outputSequence[count]).activate();
            } else {
                this.stateManager.userInputEnabled = true;
                sub.unsubscribe();
            }
        });
    }

    private onUserInput(buttonColor: string): void {
        this.gradeUserInput(buttonColor);
        if (this.userInputsCount === this.outputSequence.length) {
            this.userInputsCount = 0;
            if (this.outputSequence.length < 20) {
                this.addRandomSequenceColor();
                this.displaySequence();
            } else { this.endGame(); }
        }
    }

    private gradeUserInput(color: string): void {
        if (this.outputSequence[this.userInputsCount] === color) {
            this.userInputsCount++;
        } else {
            this.incorrectSound.play();
            this.stateManager.userInputEnabled = false;
            const delay = Observable.timer(2000, 0).subscribe(() => {
                this.userInputsCount = 0;
                if (this.stateManager.strictMode) {
                    this.outputSequence = [];
                    this.addRandomSequenceColor();
                }
                this.displaySequence();
                delay.unsubscribe();
            });
        }
    }

    private endGame(): void {
        this.outputSequence = [];
        this.victorySound.play();
        const delay = Observable.timer(2000, 0).subscribe(() => {
            alert('You win!');
            delay.unsubscribe();
        });
    }

    private getButtonComponent(color: string): ButtonComponent {
        return this.stateManager.gameInputs.find((input) => input.buttonColor === color);
    }

    private toggleOn(): void {
        this.stateManager.powerOn = !this.stateManager.powerOn;
        if (!this.stateManager.powerOn) { this.outputSequence = []; }
    }

    private start(): void {
        this.outputSequence = [];
        this.sequenceCount = this.outputSequence.length;
        if (this.stateManager.powerOn) {
            this.addRandomSequenceColor();
            this.displaySequence();
        }
    }
}
