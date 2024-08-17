import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { OmfoMomoItems } from '../shared/modals';
import { OutletSelectionPopupComponent } from './outlet-selection-popup/outlet-selection-popup.component';
import { ItemCardComponent } from '../shared/components/item-card/item-card.component';
import { SelectOutletComponent } from './select-outlet/select-outlet.component';
import { CategoryTabComponent } from './category-tab/category-tab.component';

@Component({
  selector: 'app-digital-menu',
  standalone: true,
  templateUrl: './digital-menu.component.html',
  styleUrls: ['./digital-menu.component.scss'],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ItemCardComponent,
    SelectOutletComponent,
    CategoryTabComponent,
  ],
})
export class DigitalMenuComponent {
  constructor(private router: Router, private foodService: FoodService) {}

  activeCategory: string | null = 'Pizza';

  selectedOutlet: string = 'SITAPUR';

  storeItems: OmfoMomoItems | null = null;

  itemAdded: boolean = false;

  ngOnInit(): void {
    this.activeCategory = this.foodService.activeCategory;
    this.storeItems = this.foodService.getAll();

    this.foodService.selectedValue$.subscribe((value) => {
      this.selectedOutlet = value;
    });
  }

  toggleCategory(category: string) {
    if (this.activeCategory === category) {
      this.activeCategory = null;
    } else {
      this.activeCategory = category;
    }
    this.foodService.activeCategory = this.activeCategory;
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

  isTotalOver200(): boolean {
    const totalAmount = this.getTotalAmount();
    return (
      totalAmount < 300 &&
      totalAmount >= 200 &&
      this.selectedOutlet === 'SITAPUR'
    );
  }

  isTotalOver300(): boolean {
    const totalAmount = this.getTotalAmount();
    return totalAmount >= 300 && this.selectedOutlet === 'SITAPUR';
  }

  getTotalCartItems() {
    let totalItems = this.foodService
      .getAllCartItems()
      .reduce((total, item) => total + item.quantity, 0);
    if (this.isTotalOver200() || this.isTotalOver300()) {
      totalItems++;
    }
    return totalItems;
  }

  openOutletSelectionPopup() {
    const dialogRef = this.dialog.open(OutletSelectionPopupComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.foodService.setSelectedValue(result);
      }
    });
  }
}
