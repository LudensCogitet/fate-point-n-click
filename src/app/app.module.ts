import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FateService} from './fate.service';
import { ClickableComponent } from './clickable/clickable.component';


@NgModule({
  declarations: [
    AppComponent,
    ClickableComponent
  ],
  imports: [
    BrowserModule,
		FormsModule
  ],
  providers: [
		FateService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
