import { Injectable, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from './button.component';

@Injectable()

export class StateManagerService {
    public gameStartedEvent: EventEmitter<any> = new EventEmitter();
    public userInputEvent: EventEmitter<string> = new EventEmitter();
    public gameInputs: ButtonComponent[] = [];
    public powerOn = false;
    public _strictMode = false;
    set strictMode(value) { this._strictMode = this.powerOn ? value : this.strictMode; }
    get strictMode() { return this._strictMode; }
    public userInputEnabled = false;
    get listeningUsersInput() { return this.powerOn && this.userInputEnabled; }
}
