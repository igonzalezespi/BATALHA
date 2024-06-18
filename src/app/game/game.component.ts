import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { GameService } from './game.service';
import { Team } from './models/team.interface';
import { Router } from '@angular/router';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule],
  providers: [GameService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit{
  constructor(
    public scoreService: ScoreService,
    private gameService: GameService,
    private router: Router,
  ) {}

  imagePath = 'assets/images/entities/';

  teams: Team[] = [];

  ngOnInit() {
    this.scoreService.score = 0;
    this.generateTeams();
  }

  generateTeams(): void {
    this.teams[0] = {
      number: this.gameService.getRandomNumber(),
      entity: this.gameService.getRandomEntity(),
    }

    this.teams[1] = {
      number: this.gameService.getRandomNumber(),
      entity: this.gameService.getRandomEntity(),
    }
  }

  choose(chosen: number): void {
    const winner = this.gameService.determineWinner(this.teams[0], this.teams[1]);
    if (winner === chosen) {
      this.win();
    } else {
      this.lose();
    }
  }

  win(): void {
    this.scoreService.score++;
    this.generateTeams();
  }

  lose(): void {
    this.router.navigate(['/result']);
  }
}
