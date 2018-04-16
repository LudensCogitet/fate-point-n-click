import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FateService } from './fate.service';

let world = `{"#anywhere":{"do":[{"if":{"eq":[{"value":"#command"},{"value":"check inventory"}]},"then":{"list":{"location":{"value":"#player"},"phrase":{"value":"You have #thing."}}}},{"if":{"eq":[{"modifier":{"operation":"modulo","operand":{"variable":"time_cycle_length"}},"variable":"#turn"},{"value":"0"}]},"then":{"if":{"eq":[{"variable":"time_of_day"},{"value":"day"}]},"then":{"do":[{"set":[{"value":"time_of_day"},{"value":"night"}]},{"say":[{"value":"<p>The morning sun has vanquished the horrible night.<p>"}]}]},"else":{"if":{"eq":[{"variable":"time_of_day"},{"value":"night"}]},"then":{"do":[{"set":[{"value":"time_of_day"},{"value":"day"}]},{"say":[{"value":"<p>What a horrible night to have a curse.<p>"}]}]}}}}]},"places":{"pedestal_room":{"description":{"value":"{Pedestal Room|pedestal_room}"},"do":[{"if":{"eq":[{"value":"#command"},{"value":"go north"}]},"or":[{"eq":[{"value":"#command"},{"value":"go to the other room"}]}],"then":{"travel":{"value":"cube_room"}}},{"if":{"eq":[{"value":"#command"},{"value":"go south"}]},"then":{"if":{"eq":[{"variable":"cube_in_pedestal"},{"value":"true"}]},"then":{"travel":{"value":"you_win"}}}},{"if":{"eq":[{"value":"#command"},{"value":"look around"}]},"or":[{"eq":[{"value":"#command"},{"value":"#enter"}]}],"then":{"say":[{"say":[{"value":"You are standing in a small circular room with bare white walls."}]},{"if":{"eq":[{"variable":"cube_in_pedestal"},{"value":"false"}]},"then":{"say":[{"value":"In the center of the room is a small, waist-high pedestal with a square depression in the center."}]}},{"if":{"eq":[{"variable":"cube_in_pedestal"},{"value":"true"}]},"then":{"say":[{"value":"In the center of the room is a small, waist-high pedestal. A matte black {cube|strange_cube} sits in a square depression in the center."}]}},{"say":[{"value":"To the north a doorway leads into another small room beyond."}]}]}},{"if":{"eq":[{"value":"#command"},{"value":"strange_cube pedestal"}]},"then":{"if":{"eq":[{"variable":"cube_in_pedestal"},{"value":"false"}]},"then":{"if":{"in":[{"value":"strange_cube"},{"value":"#player"}]},"then":{"do":[{"say":[{"say":[{"value":"You place the {cube|strange_cube} in the depression on the pedestal."}]},{"say":[{"value":"It slides in easily and clicks into place."}]},{"set":[{"value":"cube_in_pedestal"},{"value":"true"}]},{"move":[{"value":"strange_cube"},{"value":"#here"}]}]}]}}}}]},"cube_room":{"description":{"value":"{Alcove|cube_room}"},"do":[{"if":{"eq":[{"value":"#command"},{"value":"go south"}]},"then":{"travel":{"value":"pedestal_room"}}},{"if":{"in":[{"value":"strange_cube"},{"value":"#here"}]},"then":{"do":[{"if":{"eq":[{"value":"#command"},{"value":"look around"}]},"or":[{"eq":[{"value":"#command"},{"value":"#enter"}]}],"then":{"say":[{"value":"A small black {cube|strange_cube} sits in an alcove in this otherwise featureless room."}]}},{"if":{"eq":[{"value":"#command"},{"value":"use strange_cube"}]},"then":{"do":[{"say":[{"value":"You take the {cube|strange_cube}."}]},{"move":[{"value":"strange_cube"},{"value":"#player"}]}]}}]}},{"if":{"nin":[{"value":"strange_cube"},{"value":"#here"}]},"then":{"if":{"eq":[{"value":"#command"},{"value":"look around"}]},"or":[{"eq":[{"value":"#command"},{"value":"#enter"}]}],"then":{"say":[{"value":"An empty alcove is the only notable feature of this otherwise featureless room."}]}}}]},"you_win":{"description":{"value":"{You Win!|you_win}"},"do":[{"if":{"eq":[{"value":"#command"},{"value":"look around"}]},"or":[{"eq":[{"value":"#command"},{"value":"#enter"}]}],"then":{"say":[{"value":"YOU WIN!"}]}},{"if":{"eq":[{"value":"#command"},{"value":"go north"}]},"then":{"travel":{"value":"pedestal_room"}}}]}},"things":{"#player":{"location":"pedestal_room"},"strange_cube":{"location":"cube_room","description":"{a small black cube|strange_cube}","do":[{"if":{"eq":[{"value":"#command"},{"value":"examine strange_cube"}]},"then":{"say":[{"value":"It's a small matte black {cube|strange_cube}, perfectly smooth and about 2 inches on a side"}]}}]}},"variables":{"cube_in_pedestal":{"value":"false"},"time_cycle_length":{"value":"7"},"time_of_day":{"value":"day"},"#turn":{"value":"1"}},"settings":{"registerTurn":"input","commandsPerTurn":"2","keywords":[{"keyword":"use"},{"keyword":"examine"},{"keyword":"look around"},{"keyword":"{inventory|check inventory}"},{"keyword":"{north|go north}"},{"keyword":"{south|go south}"},{"keyword":"{east|go east}"},{"keyword":"{west|go west}"}]}}`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
	private gameStateSub: Subscription;
	private aliases: any[] = [];
	private keywordAliases: any[] = [];
	public keywords: string[];

	public paragraphs: string[][] = [];
	public lastRoom: string;
	public currentRoom: string;

	@ViewChild('text') textWindow: ElementRef;

	constructor(private fateService: FateService) {}

	ngOnInit() {
		this.gameStateSub = this.fateService.$gameState.subscribe(gameState => {
			if(!gameState) return;

			if(!this.keywords) {
				this.getKeywords(gameState);
			}

			this.lastRoom = this.currentRoom;
			this.currentRoom = gameState.currentLocation.name;
			if(gameState.response) {
				if(this.lastRoom !== this.currentRoom) {
					this.aliases = [];
					this.paragraphs = [];
					this.paragraphs.push(this.getAliases(gameState.currentLocation.description).split(' '));
				} else {
					this.paragraphs.push([`"${gameState.lastCommandDisplay}"`]);
				}

				gameState.response.split('<p>').forEach(paragraph => {
					this.paragraphs.push(this.getAliases(paragraph).split(' '));
				});
			} else {
				this.paragraphs.push([`"${gameState.lastCommandDisplay}"`]);
			}
		});

		this.fateService.load(world);
	}

	ngOnDestroy() {
		if(this.gameStateSub) this.gameStateSub.unsubscribe();
	}

	ngAfterViewChecked() {
		this.textWindow.nativeElement.scrollTop = this.textWindow.nativeElement.offsetHeight + 100;
	}

	public extractWordData(text, storage = this.aliases) {
		let match = text.match(/{([0-9]+)}/);

		if(!match) {
			return {content: text};
		}

		return storage[+match[1]];
	}

	private getAliases(text, storage = this.aliases) {
		let match = text.match(/{(.*)\|(.*)}/);

		while(match) {
			storage.push({display: match[1], content: match[2]});

			text = text.replace(match[0], `\{${storage.length - 1}\}`);
			match = text.match(/{(.*)\|(.*)}/);
		}
		console.log(text);
		return text;
	}

	private getKeywords(gameState) {
		this.keywords = gameState.world.settings.keywords.map(x => this.getAliases(x.keyword, this.keywordAliases));
		console.log(this.keywords);
	}
}
