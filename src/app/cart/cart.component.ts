import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { CartItem, OrderType } from '../shared/modals';
import { CheckoutPopupComponent } from './checkout-popup/checkout-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(private router: Router, private foodService: FoodService) {}

  cartItems: CartItem[] = [];

  readonly dialog = inject(MatDialog);

  selectedOutlet: string = 'SITAPUR';

  ngOnInit(): void {
    this.cartItems = this.foodService.getAllCartItems();

    this.foodService.selectedValue$.subscribe((value) => {
      this.selectedOutlet = value;
    });
  }

  getTotalAmount() {
    return this.cartItems.reduce(
      (total, item) => total + item.perItemPrice * item.quantity,
      0
    );
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getItemSize(item: CartItem) {
    return item.size && item.size.toString().toUpperCase();
  }

  navigateToHome() {
    this.router.navigate(['/digital-menu']);
  }

  phoneNumber: string = '7518999096';

  shouldTakeDeliveryCharge(orderType: OrderType) {
    return orderType.deliveryType === 'DELIVERY' && this.getTotalAmount() < 300;
  }

  formatOrderDetails(orderType: OrderType) {
    const orderItems = this.cartItems
      .map((item: CartItem) => {
        return `    ${item.name.toUpperCase()} - ${item.size?.toUpperCase()}${
          item.withExtraCheese ? ' WITH EXTRA CHEESE' : ''
        }${item.withCheeseBurst ? ' WITH CHEESE BURST' : ''} [${
          item.quantity
        }]`;
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
        ? 'DELIVERY CHARGE - 30' + encodeURI('\n')
        : ''
    }TOTAL - ${this.getTotalAmount() + (this.shouldTakeDeliveryCharge(orderType) ? 30 : 0)}${encodeURI(
      '\n'
    )}**************************${encodeURI('\n')}OUTLET - ${
      this.selectedOutlet
    }${encodeURI('\n')}MODE - ${orderType.deliveryType}${encodeURI('\n')}${
      orderType.deliveryType === 'DELIVERY' ? 'ADD - ' + orderType.message : ''
    }`;
  }

  generateWhatsAppLink(orderType: OrderType): string {
    const formattedOrderDetails = this.formatOrderDetails(orderType);
    return `https://api.whatsapp.com/send?phone=${this.phoneNumber}&text=${formattedOrderDetails}`;
  }

  clearCart() {
    this.foodService.clearCart();
    this.cartItems = this.foodService.getAllCartItems();
  }

  orderNow() {
    const dialogRef = this.dialog.open(CheckoutPopupComponent, {
      data: this.getTotalAmount(),
    });

    dialogRef.afterClosed().subscribe((result: OrderType) => {
      if (result) {
        const link = this.generateWhatsAppLink(result);
        this.clearCart();
        window.open(link, '_blank');
      }
    });
  }

  isDisable() {
    return this.getTotalItems() === 0;
  }

  increaseQuantity(item: CartItem) {
    this.foodService.increaseItemQuantityInCart(item);
  }

  decreaseQuantity(item: CartItem) {
    this.foodService.decreaseItemQuantityInCart(item);
  }
}
