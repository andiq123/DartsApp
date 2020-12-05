import { IWinner } from './../models/winner';
import { IPlayer } from './../models/player';
import { PlayerServiceService } from './player-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill4skill',
  templateUrl: './skill4skill.component.html',
  styleUrls: ['./skill4skill.component.css'],
})
export class Skill4skillComponent implements OnInit {
  maxPlayers = 10;
  maxRounds = 10;
  nrOfPlayers: number;
  plobj = [];
  isGameStarted = false;
  players: IPlayer[] = [];
  winners: IWinner[] = [];
  nrOfRounds = 5;
  // Game stuff
  round = 1;
  rounds = ['Rounds', 1, 2, 3, 4, 5];

  constructor(private PlayerService: PlayerServiceService) {}

  ngOnInit(): void {
    this.players = this.PlayerService.getPlayers();
    this.PlayerService.scoreUpdated.subscribe(() => {
      this.players = this.PlayerService.getPlayers();
    });
    this.PlayerService.nextRound.subscribe(() => {
      this.nextRound();
    });
  }

  setPlayers(): void {
    this.nrOfPlayers =
      this.nrOfPlayers > this.maxPlayers ? this.maxPlayers : this.nrOfPlayers;
    this.plobj = [];
    for (let i = 1; i <= this.nrOfPlayers; i++) {
      this.plobj.push(i);
    }
  }

  setRounds(): void {
    this.nrOfRounds =
      this.nrOfRounds > this.maxRounds ? this.maxRounds : this.nrOfRounds;
    this.rounds = [];
    this.rounds[0] = 'Rounds';
    for (let i = 1; i <= this.nrOfRounds; i++) {
      this.rounds.push(i);
    }
  }

  startGame(): void {
    this.isGameStarted = this.PlayerService.startGame();
    this.players = this.PlayerService.getPlayers();
  }

  nextRound(): void {
    this.round++;
    this.PlayerService.unlockBtns();
    if (this.round >= this.rounds.length) {
      this.winners = this.PlayerService.getWinners();
    }
  }

  resetGame(): void {
    this.players = [];
    this.isGameStarted = false;
    this.winners = [];
    this.plobj = [];
    this.round = 1;
    this.nrOfPlayers = 0;
    this.PlayerService.resetGame();
  }
}
