import { Injectable, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from './button.component';

@Injectable()

export class StateManagerService {

    public gameStartedEvent: EventEmitter<any> = new EventEmitter();
    public gameEndedEvent: EventEmitter<any> = new EventEmitter();
    public userInputEvent: EventEmitter<string> = new EventEmitter();
    public gameInputs: ButtonComponent[] = [];

    public powerOn = false;

    private _gameInProgress = false;
    get gameInProgress() { return this._gameInProgress; }

    public strictMode = false;
    public userInputEnabled = false;
    get listeningUsersInput() { return this.gameInProgress && this.userInputEnabled; }

    startGame(): void {
        if (this.powerOn) {
            this._gameInProgress = true;
            this.gameStartedEvent.emit(null);
        }
    }

    endGame(): void {
        this._gameInProgress = false;
        this.gameEndedEvent.emit(null);
    }


}
