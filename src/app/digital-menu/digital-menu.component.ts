/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { CommonModule } from '@angular/common';
import { Component, inject, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { StoreItems } from '../shared/modals';
import { CategoryTabComponent } from './category-tab/category-tab.component';
import { OutletSelectionPopupComponent } from './outlet-selection-popup/outlet-selection-popup.component';

export enum RestaurantEnum {
  LUCKNOW = 226021,
  SHAHABAD = 241124,
}

@Component({
  selector: 'app-digital-menu',
  standalone: true,
  templateUrl: './digital-menu.component.html',
  styleUrls: ['./digital-menu.component.scss'],
  imports: [CommonModule, MatSlideToggleModule, CategoryTabComponent],
})
export class DigitalMenuComponent implements OnInit {
  activeCategory: string | null = null;

  private restaurantId: number = 0;

  private tableNumber: number = -1;

  public totalRestaurantItems: number = 0;

  public isItemLoaded: boolean = false;

  categorizedItems: StoreItems = {
    pizzaItems: [],
    momosItems: [],
    burgerItems: [],
    shakesItems: [],
    chaapItems: [],
    chineseItems: [],
    otherItems: [],
  };

  itemAdded: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService,
  ) {
    effect(() => {
      const items = this.foodService.items();
      this.totalRestaurantItems = items.length;

      console.log('***');
      console.log(items);
      console.log(this.totalRestaurantItems);

      items.forEach((item) => {
        switch (item.category) {
          case 'PIZZA':
            this.categorizedItems.pizzaItems.push(item);
            break;
          case 'MOMO':
            this.categorizedItems.momosItems.push(item);
            break;
          case 'BURGER':
            this.categorizedItems.burgerItems.push(item);
            break;
          case 'SHAKE':
            this.categorizedItems.shakesItems.push(item);
            break;
          case 'CHAAP':
            this.categorizedItems.chaapItems.push(item);
            break;
          case 'CHINESE':
            this.categorizedItems.chineseItems.push(item);
            break;
          case 'OTHER':
            this.categorizedItems.otherItems.push(item);
            break;
          default:
            console.warn(
              `Unknown category: ${item.category} for item ${item.name}`,
            );
        }
      });
    });
  }

  getRestaurantIdByName(name: string): number {
    return RestaurantEnum[name.toUpperCase() as keyof typeof RestaurantEnum];
  }

  public ngOnInit(): void {
    this.activeCategory = this.foodService.activeCategory;

    this.foodService.itemAddedSuccessFully.subscribe(() => {
      this.showTransition();
    });

    this.route.queryParamMap.subscribe((params) => {
      this.restaurantId = params.get('restaurant_id')
        ? Number(params.get('restaurant_id'))
        : 0;
      this.tableNumber = params.get('table_number')
        ? Number(params.get('table_number'))
        : -1;

      if (this.restaurantId === 0) {
        const dialogRef = this.dialog.open(OutletSelectionPopupComponent);

        dialogRef.afterClosed().subscribe((RESTAURANT_NAME: string) => {
          if (RESTAURANT_NAME) {
            console.log('MACHU...');
            console.log(RESTAURANT_NAME);

            this.restaurantId =
              this.getRestaurantIdByName(RESTAURANT_NAME) || 0;

            console.log('000');
            console.log(this.restaurantId);

            if (this.restaurantId) {
              this.router
                .navigate(['/digital-menu'], {
                  queryParams: {
                    restaurant_id: this.restaurantId,
                    table_number: this.tableNumber,
                  },
                })
                .then(() => {
                  window.location.reload();
                });
            }
          }
        });
      } else {
        console.log('222');
        console.log(this.restaurantId);
        const items = this.foodService.items();
        if ((this.restaurantId && items.length === 0) || items.length === 0) {
          this.foodService.getAll(this.restaurantId).subscribe((_response) => {
            this.isItemLoaded = true;
          });
        }
      }
    });
  }

  public toggleCategory(category: string) {
    if (this.activeCategory === category) {
      this.activeCategory = null;
    } else {
      this.activeCategory = category;
    }

    this.foodService.activeCategory = this.activeCategory;
  }

  public navigateToCart() {
    this.router.navigate(['/cart'], {
      queryParams: {
        restaurant_id: this.restaurantId,
        table_number: this.tableNumber,
      },
    });
  }

  readonly dialog = inject(MatDialog);

  public showTransition(): void {
    this.itemAdded = true;
    setTimeout(() => {
      this.itemAdded = false;
    }, 1000);
  }

  public getTotalCartItems() {
    const totalItems = this.foodService
      .getAllCartItems()
      .reduce((total, item) => total + item.quantity, 0);
    return totalItems;
  }
}
