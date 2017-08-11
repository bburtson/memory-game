import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { BUTTONCOLORS } from './ButtonColors';
import { StateManagerService } from './state-manager.service';
import { Subscription } from 'rxjs/Subscription';
import { ButtonComponent } from './button.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/timer';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',

    styleUrls: ['game.component.css']
})
export class GameComponent implements OnInit {

    buttonColors = BUTTONCOLORS;
    outputSequence = new Array<string>();
    sequenceDisplayCount = 0;
    userInputsCount = 0;

    constructor(private stateManager: StateManagerService) { }

    ngOnInit(): void {
        this.stateManager.gameStartedEvent.subscribe(() => { this.onGameStarted(); });
        this.stateManager.userInputEvent.subscribe((e) => { this.onUserInput(e); });
    }

    onGameStarted(): void {
        this.propagateSequence();
    }

    propagateSequence(): void {
        this.outputSequence.push(this.getRandomColor());
        this.displaySequence();
    }

    displaySequence(): void {
        this.sequenceDisplayCount = this.outputSequence.length;
        const sub = Observable.timer(1500, 800).subscribe((count) => {
            if (count < this.outputSequence.length) {
                this.stateManager.userInputEnabled = false;
                this.getButtonComponent(this.outputSequence[count]).activate();
            } else {
                this.stateManager.userInputEnabled = true;
                this.sequenceDisplayCount = this.userInputsCount;
                sub.unsubscribe();
            }
        });
    }

    onUserInput(buttonColor: string): void {
        console.log(buttonColor);
        this.gradeUserInput(buttonColor);
        if (this.userInputsCount === this.outputSequence.length) {
            console.dir('branched');
            this.userInputsCount = 0;
            this.propagateSequence();
        }
    }

    gradeUserInput(color: string): void {
        console.dir(color);
        if (this.outputSequence[this.userInputsCount] === color) {
            this.userInputsCount++;
        } else if (this.stateManager.strictMode) {
            // handle incorrect
        } else {
            this.stateManager.userInputEnabled = false;
            this.userInputsCount = 0;
            this.displaySequence();
        }
    }
    getButtonComponent(color: string): ButtonComponent {
        return this.stateManager.gameInputs.find((input) => input.buttonColor === color);
    }



    getRandomColor(): string {
        const i = Math.floor(Math.random() * (this.buttonColors.length));
        return this.buttonColors[i];
    }


    toggleOn(): void {
        this.stateManager.powerOn = !this.stateManager.powerOn;
    }

    start(): void {
        this.stateManager.startGame();
    }
}
