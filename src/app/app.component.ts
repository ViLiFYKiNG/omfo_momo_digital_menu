import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from './services/food.service';
import { ENV } from '../env/env';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly dialog = inject(MatDialog);
  constructor(private foodService: FoodService) {}
  ngOnInit(): void {
    console.log('000');
    console.log(ENV);
  }
}
