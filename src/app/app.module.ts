import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { Skill4skillComponent } from './skill4skill/skill4skill.component';
import { FormsModule } from '@angular/forms';
import { PlayerSetComponent } from './skill4skill/player-set/player-set.component';
import { PlayerScoreComponent } from './skill4skill/player-score/player-score.component';

@NgModule({
  declarations: [AppComponent, NavComponent, Skill4skillComponent, PlayerSetComponent, PlayerScoreComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
