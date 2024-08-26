import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OutletSelectionPopupComponent } from './digital-menu/outlet-selection-popup/outlet-selection-popup.component';
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
    const dialogRef = this.dialog.open(OutletSelectionPopupComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.foodService.setOutlet(result);
      }
    });

    console.log('000');
    console.log(ENV);
  }
}
