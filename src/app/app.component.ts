import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FoodService } from './services/food.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private foodService: FoodService) {}
  
  ngOnInit(): void {
    this.foodService.getAll();
  }
}
