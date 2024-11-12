import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  viewChild,
  computed,
  effect,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
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

  categorizedItems: StoreItems = {
    pizzaItems: [],
    momosItems: [],
    burgerItems: [],
    shakesItems: [],
  };

  itemAdded: boolean = false;

  constructor(private router: Router, private foodService: FoodService) {
    effect(() => {
      const items = this.foodService.items();
      console.log('---');
      console.log(items);

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

      console.log('****', this.categorizedItems);
    });
  }

  public ngOnInit(): void {
    console.log('ON INIT');
    this.foodService.getAll();

    this.foodService.itemAddedSuccessFully.subscribe(() => {
      this.showTransition();
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

  public getTotalAmount() {
    return this.foodService.cartItems.reduce(
      (total, item) => total + item.perItemPrice * item.quantity,
      0
    );
  }

  public getTotalCartItems() {
    let totalItems = this.foodService
      .getAllCartItems()
      .reduce((total, item) => total + item.quantity, 0);
    return totalItems;
  }
}
