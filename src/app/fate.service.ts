import { Injectable } from '@angular/core';
import { Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as fate from '../../../fate/fate';

@Injectable()
export class FateService {
	private worldString: string;
	private gameState: Subject<any> = new Subject();
	private commandBuffer: string[] = [];

	public $gameState: Observable<any> = this.gameState.asObservable();

  constructor() {}

	public load(worldString) {
		this.worldString = worldString;
		fate.load(worldString);
		this.gameState.next(fate.start());
	}

	public restart() {
		this.load(this.worldString);
	}

	public move(command) {
		this.commandBuffer = this.commandBuffer.concat(command.split(' '));
		if(this.commandBuffer.length > 1) {
			let result = fate.move(this.commandBuffer.join(' '));
			this.gameState.next(result);
			this.commandBuffer = [];
		}
	}

	public clearFromBuffer(command) {
		let index = this.commandBuffer.indexOf(command);
		if(index > -1) {
			this.commandBuffer.splice(index, 1);
		}
	}
}
