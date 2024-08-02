import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { PizzaPopupComponent } from './pizza-popup/pizza-popup.component';
import { MomoPopupComponent } from './momo-popup/momo-popup.component';
import { ChinesePopupComponent } from './chinese-popup/chinese-popup.component';
import { CartItem, ChineseItem, MomoItem, OmfoMomoItems, PizzaItem } from '../shared/modals';

@Component({
  selector: 'app-digital-menu',
  standalone: true,
  templateUrl: './digital-menu.component.html',
  styleUrls: ['./digital-menu.component.scss'],
  imports: [CommonModule, MatSlideToggleModule],
})
export class DigitalMenuComponent {
  constructor(private router: Router, private foodService: FoodService) {}

  activeCategory: string | null = 'Pizza';

  storeItems: OmfoMomoItems | null = null;

  ngOnInit(): void {
    this.activeCategory = this.foodService.activeCategory;
    this.storeItems = this.foodService.getAll();
  }

  toggleCategory(category: string) {
    if (this.activeCategory === category) {
      this.activeCategory = null;
    } else {
      this.activeCategory = category;
    }
    this.foodService.activeCategory = this.activeCategory;
  }

  increaseQuantity(item: CartItem) {
    this.foodService.increaseQuantity(item);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  readonly menuTrigger = viewChild.required(MatMenuTrigger);

  readonly dialog = inject(MatDialog);

  openDialog(item: PizzaItem) {
    const dialogRef = this.dialog.open(PizzaPopupComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: CartItem) => {
      if (result) {
        this.increaseQuantity(result);
      }
    });
  }

  openDialogForMOMO(item: MomoItem) {
    const dialogRef = this.dialog.open(MomoPopupComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: CartItem) => {
      if (result) {
        this.increaseQuantity(result);
      }
    });
  }

  openDialogForCHINESE(item: ChineseItem) {
    const dialogRef = this.dialog.open(ChinesePopupComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: CartItem) => {
      if (result) {
        this.increaseQuantity(result);
      }
    });
  }

  getTotalCartItems() {
    return this.foodService
      .getAllCartItems()
      .reduce((total, item) => total + item.quantity, 0);
  }
}
