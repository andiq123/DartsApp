import { PlayerServiceService } from './../player-service.service';
import { IPlayer } from 'src/app/models/player';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-score',
  templateUrl: './player-score.component.html',
  styleUrls: ['./player-score.component.css'],
})
export class PlayerScoreComponent implements OnInit {
  @Input() player: IPlayer;
  score: string;
  isLocked = false;

  constructor(private playerService: PlayerServiceService) {}

  ngOnInit(): void {
    this.playerService.unlockButtons.subscribe(() => {
      this.reset();
    });
  }

  addScore(): void {
    if (this.score) {
      let scoreParsed = 0;
      if (this.score.includes(',')) {
        scoreParsed = this.score
          .split(',')
          .map((x) => Number(x))
          .reduce((a, b) => a + b);
      } else {
        scoreParsed = Number(this.score);
      }
      if (!isNaN(scoreParsed) && Number(scoreParsed) >= 0) {
        this.isLocked = true;
        this.playerService.addScore(this.player.id, scoreParsed);
      }
    }
  }

  reset(): void {
    this.score = null;
    this.isLocked = false;
  }
}
