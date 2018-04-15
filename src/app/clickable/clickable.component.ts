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
	@Input() data: any;

	@Input() isButton: boolean = false;

	public display: string;
	public content: string;

	private gameStateSub: Subscription;

  constructor(private fateService: FateService) { }

  ngOnInit() {
		this.display = this.data.display || this.data.content;

		this.content = this.data.content.replace(/[.,:]/g, '');

		this.gameStateSub = this.fateService.$gameState.subscribe(gameState => {
			this.selected = false;
			console.log("hello");
		});
	}

	ngOnDestroy() {
		if(this.gameStateSub) this.gameStateSub.unsubscribe();
	}

	public clicked() {
		this.selected = !this.selected;
		console.log("CONTENT",this.content);
		if(this.selected) {
			this.fateService.move({display: this.display, content: this.content});
		} else {
			this.fateService.clearFromBuffer({display: this.display, content: this.content});
		}
	}
}
