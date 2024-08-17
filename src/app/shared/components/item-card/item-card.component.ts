import { Component, input, output } from '@angular/core';
import { BurgerItem, MomoItem, PizzaItem, ShakeItem } from '../../modals';
import { ITEMTYPES } from '../../constants';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  item = input.required<PizzaItem | MomoItem | BurgerItem | ShakeItem>();

  selectedItem = output<{
    item: PizzaItem | MomoItem | BurgerItem | ShakeItem;
    event: Event;
  }>();

  public onSelectItem(event: Event): void {
    console.log('***');
    console.log(this.item());
    this.selectedItem.emit({ item: this.item(), event });
  }

  public getPrice(): number {
    if (this.item().itemType === ITEMTYPES.PIZZA) {
      return (this.item() as PizzaItem).price.small;
    } else if (this.item().itemType === ITEMTYPES.MOMO) {
      return (this.item() as MomoItem).price.half;
    } else {
      return (this.item() as BurgerItem | ShakeItem).price;
    }
  }
}
