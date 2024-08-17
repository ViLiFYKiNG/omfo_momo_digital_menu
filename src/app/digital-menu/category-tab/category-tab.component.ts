import { NgIf } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  PizzaItem,
  MomoItem,
  BurgerItem,
  ShakeItem,
  CartItem,
} from '../../shared/modals';
import { ItemCardComponent } from '../../shared/components/item-card/item-card.component';
import { SelectItemPopupComponent } from '../select-item-popup/select-item-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-category-tab',
  standalone: true,
  imports: [NgIf, ItemCardComponent],
  templateUrl: './category-tab.component.html',
  styleUrl: './category-tab.component.scss',
})
export class CategoryTabComponent {
  category = input.required<string>();
  activeCategory = input.required<string | null>();

  items = input.required<
    PizzaItem[] | MomoItem[] | BurgerItem[] | ShakeItem[]
  >();

  readonly dialog = inject(MatDialog);

  private foodService = inject(FoodService);

  public onItemSelect({
    item,
    event,
  }: {
    item: PizzaItem | MomoItem | BurgerItem | ShakeItem;
    event: Event;
  }): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(SelectItemPopupComponent, {
      data: item,
    });

    dialogRef.afterClosed().subscribe((result: CartItem) => {
      if (result) {
        this.foodService.increaseQuantity(result);
      }
    });
  }

  get ShowOrHide(): boolean {
    return this.category() === this.activeCategory();
  }
}
