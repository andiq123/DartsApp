import { IPlayer } from './../../models/player';
import { PlayerServiceService } from './../player-service.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-set',
  templateUrl: './player-set.component.html',
  styleUrls: ['./player-set.component.css'],
})
export class PlayerSetComponent implements OnInit {
  @Input() index: number;
  id: number;
  name: string;
  lock = false;
  constructor(private playerService: PlayerServiceService) {}

  ngOnInit(): void {}

  addPlayer(): void {
    if (this.name) {
      const player = { id: 0, name: this.name, score: [] } as IPlayer;
      this.lock = this.playerService.addPlayer(player);
    }
  }
}
