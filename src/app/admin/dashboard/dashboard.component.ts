/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AddItemPopupComponent } from './add-item-popup/add-item-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DataStorageService } from '../services/data-storage.service';
import { map } from 'rxjs';
import { OmfoItem, RestaurantEnum } from '../../shared/modals';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  displayedColumns = [
    'position',
    'name',
    'restaurant',
    'category',
    'isAvailable',
    'actions',
  ];

  public items = signal<OmfoItem[] | []>([]);

  public filteredItems = signal<OmfoItem[] | []>([]);

  public isFetching = signal<boolean>(false);

  public error = signal<string | null>(null);

  private dataStorageService = inject(DataStorageService);

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.fetchItems();
  }

  public getRestaurantNameById(id: number): string {
    return (
      Object.entries(RestaurantEnum).find(([_key, value]) => {
        return value === id;
      })?.[0] || 'SHAHABAD'
    );
  }

  public fetchItems(): void {
    this.isFetching.set(true);
    this.dataStorageService
      .fetchItems()
      .pipe(
        map((response: Record<string, any> | null) => {
          return (
            response &&
            Object.keys(response).map((itemId) => ({
              itemId,
              ...response[itemId],
              restaurantId: this.getRestaurantNameById(
                Number(
                  ((response[itemId] as OmfoItem).restaurantId ??= '241124'),
                ),
              ),
            }))
          );
        }),
      )
      .subscribe({
        next: (response: OmfoItem[] | null) => {
          if (response) {
            this.items.set(response);
            this.filteredItems.set(response);
            console.log(response);
          } else this.items.set([]);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error) => {
          this.error.set(error.message);
          this.isFetching.set(false);
        },
      });
  }

  public applyFilter(filterValue: string): void {
    const filtered = this.items().filter(
      (item) =>
        item.restaurantId
          ?.toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase()) ||
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.category.toLowerCase().includes(filterValue.toLowerCase()),
    );
    this.filteredItems.set(filtered);
  }

  public onFilterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.applyFilter(input.value);
  }

  readonly dialog = inject(MatDialog);

  public addItem(): void {
    const dialogRef = this.dialog.open(AddItemPopupComponent, {
      data: null,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.fetchItems();
      }
    });
  }

  public logOut(): void {
    this.authService.logout();
  }

  public toggleItem(item: OmfoItem): void {
    this.isFetching.set(true);
    item.itemId &&
      this.dataStorageService
        .updateItem(item.itemId.toString(), {
          ...item,
          isAvailable: !item.isAvailable,
        })
        .subscribe({
          next: () => {
            this.fetchItems();
          },
          error: (err) => {
            console.error('Error updating item:', err);
            this.isFetching.set(false);
          },
        });
  }

  public editItem(item: OmfoItem): void {
    const dialogRef = this.dialog.open(AddItemPopupComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.fetchItems();
      }
    });
  }
  public deleteItem(item: OmfoItem): void {
    this.isFetching.set(true);
    item.itemId &&
      this.dataStorageService.deleteItem(item.itemId.toString()).subscribe({
        next: () => {
          this.fetchItems();
        },
        error: (err) => {
          console.error('Error deleting item:', err);
          this.isFetching.set(false);
        },
      });
  }
}
