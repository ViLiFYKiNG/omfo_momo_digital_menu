import { Component, input, output } from '@angular/core';
import { OmfoItem } from '../../modals';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  item = input.required<OmfoItem>();

  selectedItem = output<{
    item: OmfoItem;
    event: Event;
  }>();

  public onSelectItem(event: Event): void {
    this.selectedItem.emit({ item: this.item(), event });
  }

  public getPrice(): number {
    return this.item().sizes.at(0)?.price!;
  }
}
