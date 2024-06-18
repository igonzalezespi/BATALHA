import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, TranslateModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  constructor(
    private router: Router,
    public scoreService: ScoreService

  ) {}

  retry() {
    this.scoreService.score = 0;
    this.router.navigate(['/game']);
  }
}
