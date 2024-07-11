import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScoreService } from './score.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  providers: [ScoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
