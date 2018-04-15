import { Injectable } from '@angular/core';
import { Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as fate from '../../../fate/fate';

@Injectable()
export class FateService {
	private worldString: string;
	private gameState: Subject<any> = new Subject();
	private commandBuffer: string[] = [];
	private displayBuffer: string[] = [];

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
		this.displayBuffer = this.displayBuffer.concat(command.display);
		this.commandBuffer = this.commandBuffer.concat(command.content.split(' '));
		if(this.commandBuffer.length > 1) {
			let lastCommandDisplay = this.displayBuffer.join(' > ');
			let result = fate.move(this.commandBuffer.join(' '));

			result.lastCommandDisplay = lastCommandDisplay;
			this.gameState.next(result);
			this.commandBuffer = [];
			this.displayBuffer = [];
		}
	}

	public clearFromBuffer(command) {
		let displayIndex = this.displayBuffer.indexOf(command.display);
		let commandIndex = this.commandBuffer.indexOf(command.content);
		if(commandIndex > -1) {
			this.commandBuffer.splice(commandIndex, 1);
		}

		if(displayIndex > -1) {
			this.displayBuffer.splice(displayIndex, 1);
		}
	}
}
