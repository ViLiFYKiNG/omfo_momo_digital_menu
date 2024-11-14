import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { NewCartItem, OrderType } from '../shared/modals';
import { CheckoutPopupComponent } from './checkout-popup/checkout-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ENV } from '../../env/env';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private router: Router, private foodService: FoodService) {}

  newCartItems: NewCartItem[] = [];

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.newCartItems = this.foodService.getAllCartItems();

    if (!ENV.isProd) {
      this.phoneNumber = '8869860624';
    }
  }

  getTotalAmount() {
    return this.newCartItems.reduce(
      (total, item) => total + item.perItemPrice * item.quantity,
      0
    );
  }

  getTotalItems() {
    let totalItems = this.newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    return totalItems;
  }

  getItemSize(item: NewCartItem) {
    return item.size && item.size.toString().toUpperCase();
  }

  navigateToHome() {
    this.router.navigate(['/digital-menu/00000000']);
  }

  phoneNumber: string = '7518999096';

  shouldTakeDeliveryCharge(orderType: OrderType) {
    return orderType.deliveryType === 'DELIVERY' && this.getTotalAmount() < 300;
  }

  formatOrderDetails(orderType: OrderType) {
    const orderItems = this.newCartItems
      .map((item: NewCartItem) => {
        return `    ${item.name.toUpperCase()} - ${item.size?.toUpperCase()}${
          item.toppings.includes('EXTRA_CHEESE') ? ' WITH EXTRA CHEESE' : ''
        }${
          item.toppings.includes('CHEESE_BURST') ? ' WITH CHEESE BURST' : ''
        } ${
          item.price
            ? '[QUANTITY - ' + item.quantity + '] [PRICE - ₹' + item.price + ']'
            : '[FREE]'
        }`;
      })
      .join(encodeURI('\n'));
    return `ORDER ID - ${new Date().getTime()}${encodeURI('\n')}NAME - ${
      orderType.name
    }${encodeURI('\n')}**************************${encodeURI(
      '\n'
    )}ITEMS DETAILS - ${encodeURI('\n')}${orderItems}${encodeURI(
      '\n'
    )}**************************${encodeURI(
      '\n'
    )}TOTAL ITEMS - ${this.getTotalItems()}${encodeURI('\n')}${
      this.shouldTakeDeliveryCharge(orderType)
        ? 'ITEMS TOTAL - ' + this.getTotalAmount() + encodeURI('\n')
        : ''
    }${
      this.shouldTakeDeliveryCharge(orderType)
        ? 'DELIVERY CHARGE - 20' + encodeURI('\n')
        : ''
    }TOTAL - ${
      this.getTotalAmount() +
      (this.shouldTakeDeliveryCharge(orderType) ? 20 : 0)
    }${encodeURI('\n')}**************************${encodeURI('\n')}MODE - ${
      orderType.deliveryType
    }${encodeURI('\n')}${
      orderType.deliveryType === 'DELIVERY' ? 'ADD - ' + orderType.message : ''
    }`;
  }

  generateWhatsAppLink(orderType: OrderType): string {
    const formattedOrderDetails = this.formatOrderDetails(orderType);
    return `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${formattedOrderDetails}`;
  }

  clearCart() {
    this.foodService.clearCart();
    this.newCartItems = this.foodService.getAllCartItems();
  }

    orderNow() {
    const dialogRef = this.dialog.open(CheckoutPopupComponent, {
      data: this.getTotalAmount(),
    });

    dialogRef.afterClosed().subscribe((result: OrderType) => {
      if (result) {
        const link = this.generateWhatsAppLink(result);
        window.open(link, '_blank');
        this.clearCart();
        this.navigateToHome();
      }
    });
  }

  isDisable() {
    return this.getTotalItems() === 0;
  }

  increaseQuantity(item: NewCartItem) {
    this.foodService.increaseItemQuantityInCartNew(item);
  }

  decreaseQuantity(item: NewCartItem) {
    this.foodService.decreaseItemQuantityInCartNew(item);
  }
}
