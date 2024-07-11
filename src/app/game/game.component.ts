import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { GameService } from './game.service';
import { Team } from './models/team.interface';
import { Router } from '@angular/router';
import { ScoreService } from '../score.service';
import { ImageService } from '../image.service';
import { HuggingfaceApiService } from '../huggingface-api.service';
import { BehaviorSubject, first } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TranslateModule],
  providers: [GameService, HuggingfaceApiService, ImageService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent implements OnInit{
  constructor(
    public scoreService: ScoreService,
    private gameService: GameService,
    private router: Router,
    private imageService: ImageService,
  ) {}

  image1: BehaviorSubject<SafeUrl | null> = new BehaviorSubject<SafeUrl | null>(null);
  image2: BehaviorSubject<SafeUrl | null> = new BehaviorSubject<SafeUrl | null>(null);

  loaded: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  teams: Team[] = [];

  ngOnInit() {
    this.scoreService.score = 0;
    this.generateTeams();
  }

  generateTeams(): void {
    this.loaded.next(0);
    this.teams[0] = {
      number: this.gameService.getRandomNumber(),
      entity: this.gameService.getRandomEntity(),
    };

    this.teams[1] = {
      number: this.gameService.getRandomNumber(),
      entity: this.gameService.getRandomEntity(),
    };

    this.imageService.getImage(this.teams[0].entity.name.singular)
      .pipe(first())
      .subscribe((image) => {
        this.image1.next(image);
        this.loaded.next(this.loaded.getValue() + 1);
      });

    this.imageService.getImage(this.teams[1].entity.name.singular)
      .pipe(first())
      .subscribe((image) => {
        this.image2.next(image);
        this.loaded.next(this.loaded.getValue() + 1);
      });
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
