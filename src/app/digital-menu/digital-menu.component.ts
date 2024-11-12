import { CommonModule } from '@angular/common';
import { Component, inject, viewChild, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { OmfoMomoItems } from '../shared/modals';
import { CategoryTabComponent } from './category-tab/category-tab.component';

@Component({
  selector: 'app-digital-menu',
  standalone: true,
  templateUrl: './digital-menu.component.html',
  styleUrls: ['./digital-menu.component.scss'],
  imports: [CommonModule, MatSlideToggleModule, CategoryTabComponent],
})
export class DigitalMenuComponent {
  constructor(private router: Router, private foodService: FoodService) {}

  activeCategory: string | null = 'Pizza';

  storeItems: OmfoMomoItems | null = null;

  itemAdded: boolean = false;

  ngOnInit(): void {
    this.storeItems = this.foodService.getAll();

    this.foodService.itemAddedSuccessFully.subscribe(() => {
      this.showTransition();
    });
  }

  toggleCategory(category: string) {
    if (this.activeCategory === category) {
      this.activeCategory = null;
    } else {
      this.activeCategory = category;
    }
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  readonly dialog = inject(MatDialog);

  showTransition() {
    this.itemAdded = true;
    setTimeout(() => {
      this.itemAdded = false;
    }, 1000);
  }

  getTotalAmount() {
    return this.foodService.cartItems.reduce(
      (total, item) => total + item.perItemPrice * item.quantity,
      0
    );
  }

  getTotalCartItems() {
    let totalItems = this.foodService
      .getAllCartItems()
      .reduce((total, item) => total + item.quantity, 0);
    return totalItems;
  }
}
