import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FateService } from './fate.service';
import { world } from '../assets/world';

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
			console.log(gameState);
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
					this.paragraphs.push([`>> "${gameState.lastCommandDisplay}"`]);
				}

				gameState.response.split('<p>').forEach(paragraph => {
					this.paragraphs.push(this.getAliases(paragraph).split(' '));
				});
			} else {
				this.paragraphs.push([`>> "${gameState.lastCommandDisplay}"`]);
			}
		});

		this.fateService.load(world);
	}

	ngOnDestroy() {
		if(this.gameStateSub) this.gameStateSub.unsubscribe();
	}

	ngAfterViewChecked() {
		this.textWindow.nativeElement.scrollTop = this.textWindow.nativeElement.offsetHeight + 100000;
	}

	public extractWordData(text, storage = this.aliases) {
		let match = text.match(/{([0-9]+)}/);

		if(!match) {
			return {content: text};
		}

		return storage[+match[1]];
	}

	private getAliases(text, storage = this.aliases) {
		if(!text) return '';
		let match = text.match(/{(.*)\|(.*)}/);

		while(match) {
			storage.push({display: match[1], content: match[2]});

			text = text.replace(match[0], `\{${storage.length - 1}\}`);
			match = text.match(/{(.*)\|(.*)}/);
		}

		return text;
	}

	private getKeywords(gameState) {
		this.keywords = gameState.world.settings.keywords.map(x => this.getAliases(x.keyword, this.keywordAliases));
	}
}
