import { CommonModule } from '@angular/common';
import { Component, inject, effect, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { StoreItems } from '../shared/modals';
import { CategoryTabComponent } from './category-tab/category-tab.component';

@Component({
  selector: 'app-digital-menu',
  standalone: true,
  templateUrl: './digital-menu.component.html',
  styleUrls: ['./digital-menu.component.scss'],
  imports: [CommonModule, MatSlideToggleModule, CategoryTabComponent],
})
export class DigitalMenuComponent implements OnInit {
  activeCategory: string | null = 'Pizza';

  private restaurantId: number = 241124;

  private tableNumber: number = 0;

  categorizedItems: StoreItems = {
    pizzaItems: [],
    momosItems: [],
    burgerItems: [],
    shakesItems: [],
  };

  itemAdded: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private foodService: FoodService
  ) {
    effect(() => {
      const items = this.foodService.items();
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
          default:
            console.warn(
              `Unknown category: ${item.category} for item ${item.name}`
            );
        }
      });
    });
  }

  public ngOnInit(): void {
    this.foodService.itemAddedSuccessFully.subscribe(() => {
      this.showTransition();
    });

    this.route.paramMap.subscribe((params) => {
      this.restaurantId = params.get('restaurant_id')
        ? Number(params.get('restaurant_id'))
        : 0;
      this.tableNumber = params.get('table_number')
        ? Number(params.get('table_number'))
        : 0;


      const items = this.foodService.items();
      if ((this.restaurantId && items.length === 0) || items.length === 0) {
        this.foodService.getAll(this.restaurantId);
      }
    });
  }

  public toggleCategory(category: string) {
    if (this.activeCategory === category) {
      this.activeCategory = null;
    } else {
      this.activeCategory = category;
    }
  }

  public navigateToCart() {
    this.router.navigate(['/cart']);
  }

  readonly dialog = inject(MatDialog);

  public showTransition(): void {
    this.itemAdded = true;
    setTimeout(() => {
      this.itemAdded = false;
    }, 1000);
  }

  public getTotalCartItems() {
    let totalItems = this.foodService
      .getAllCartItems()
      .reduce((total, item) => total + item.quantity, 0);
    return totalItems;
  }
}
