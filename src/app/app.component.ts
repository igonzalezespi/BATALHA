import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [ScoreService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
