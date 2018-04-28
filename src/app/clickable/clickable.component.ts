import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FateService } from '../fate.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-clickable',
  templateUrl: './clickable.component.html',
  styleUrls: ['./clickable.component.css']
})
export class ClickableComponent implements OnInit {
	public selected: boolean = false;
	public clickable: boolean;
	public isHighlighted: boolean;

	@Input() data: any;
	@Input() isButton: boolean = false;

	public display: string;
	public content: string;

	private gameStateSub: Subscription;

  constructor(private fateService: FateService) { }

  ngOnInit() {
		if(this.data.content.slice(0, 2) === '>>') {
			this.clickable = false;
		} else {
			this.clickable = true;
		}

		this.display = this.data.display || this.data.content;

		this.isHighlighted = this.display.startsWith('!!');
		if(this.isHighlighted) this.display = this.display.slice(2);

		this.content = this.data.content.replace(/[.,:]/g, '');

		this.gameStateSub = this.fateService.$gameState.subscribe(gameState => {
			this.selected = false;
		});
	}

	ngOnDestroy() {
		if(this.gameStateSub) this.gameStateSub.unsubscribe();
	}

	public clicked() {
		if(!this.clickable) return;

		this.selected = !this.selected;
		if(this.selected) {
			this.fateService.move({display: this.display, content: this.content});
		} else {
			this.fateService.clearFromBuffer({display: this.display, content: this.content});
		}
	}
}
