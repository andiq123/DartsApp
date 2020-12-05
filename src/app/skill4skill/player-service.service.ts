import { IPlayer } from './../models/player';
import { IWinner } from './../models/winner';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerServiceService {
  // Events
  unlockButtons = new Subject();
  scoreUpdated = new Subject();
  nextRound = new Subject();
  players: IPlayer[] = [];

  constructor() {}

  addPlayer(player: IPlayer): boolean {
    const playerNameExists = this.players.find(
      (x) => x.name.toLowerCase() === player.name.toLowerCase()
    );
    if (playerNameExists) {
      return false;
    }
    this.players.push(player);
    return this.players.includes(player);
  }

  startGame(): boolean {
    const playersOk =
      this.players.length > 0 &&
      this.players.every((player) => player.name !== '');
    return playersOk;
  }

  getPlayers(): IPlayer[] {
    this.players.forEach((player, index) => {
      player.id = index;
    });
    return this.players.slice();
  }

  addScore(id: number, score: number): void {
    const user = this.players.find((x) => x.id === id);
    user.score.push(score);
    this.scoreUpdated.next();
    this.checkForNextRound();
    this.getWinners();
  }

  checkForNextRound(): void {
    const theOneWithMoreScores = Math.max(
      ...this.players.map((x) => x.score.length)
    );
    const allPlayersHaveScorde = this.players.every(
      (x) => x.score.length === theOneWithMoreScores
    );
    if (allPlayersHaveScorde) {
      this.nextRound.next();
    }
  }

  resetGame(): void {
    this.players = [];
  }

  unlockBtns(): void {
    this.unlockButtons.next();
  }

  getWinners(): IWinner[] {
    const winners = this.players.map((x) => {
      if (x.score.length > 0) {
        const result = x.score.reduce((r, c) => r + c);
        const player = { id: x.id, name: x.name, score: result } as IWinner;
        return player;
      }
    }) as IWinner[];
    winners.sort((a, b) => a.score - b.score).reverse();
    return winners;
  }
}
