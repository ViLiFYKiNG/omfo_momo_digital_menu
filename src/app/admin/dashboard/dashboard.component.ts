import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AddItemPopupComponent } from './add-item-popup/add-item-popup.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  readonly dialog = inject(MatDialog);

  public addItem(): void {
    console.log('addItem');
    const dialogRef = this.dialog.open(AddItemPopupComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        console.log(result);
        console.log('...');
      }
    });
  }

  public logOut(): void {
    this.authService.logout();
  }
}
