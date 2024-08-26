import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { CartItem, OrderType } from '../shared/modals';
import { CheckoutPopupComponent } from './checkout-popup/checkout-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ITEMTYPES } from '../shared/constants';
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

  cartItems: CartItem[] = [];

  freeItemOver300: CartItem = {
    cartItemId: 11,
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Veg Corn Pizza',
    perItemPrice: 0,
    price: 0,
    quantity: 1,
    itemType: ITEMTYPES.PIZZA,
    size: 'small',
    withExtraCheese: false,
    withCheeseBurst: false,
  };

  freeItemOver200: CartItem = {
    cartItemId: 21,
    itemId: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    name: 'Kurkure Momo',
    perItemPrice: 0,
    price: 0,
    quantity: 1,
    itemType: ITEMTYPES.MOMO,
    size: 'half',
  };

  readonly dialog = inject(MatDialog);

  selectedOutlet = computed(() => {
    return this.foodService.outlet();
  });

  ngOnInit(): void {
    this.cartItems = this.foodService.getAllCartItems();

    if(!ENV.isProd) {
      this.phoneNumber = '8869860624';
    }
  }

  isTotalOver200(): boolean {
    const totalAmount = this.getTotalAmount();
    return (
      totalAmount < 300 &&
      totalAmount >= 200 &&
      this.selectedOutlet() === 'SITAPUR'
    );
  }

  isTotalOver300(): boolean {
    const totalAmount = this.getTotalAmount();
    return totalAmount >= 300 && this.selectedOutlet() === 'SITAPUR';
  }

  isShowFreeMsg200(): boolean {
    const totalAmount = this.getTotalAmount();
    return totalAmount < 200 && this.selectedOutlet() === 'SITAPUR';
  }

  isShowFreeMsg300(): boolean {
    const totalAmount = this.getTotalAmount();
    return (
      totalAmount >= 200 &&
      totalAmount < 300 &&
      this.selectedOutlet() === 'SITAPUR'
    );
  }

  getTotalAmount() {
    return this.cartItems.reduce(
      (total, item) => total + item.perItemPrice * item.quantity,
      0
    );
  }

  getTotalItems() {
    let totalItems = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    if (this.isTotalOver200() || this.isTotalOver300()) {
      totalItems++;
    }
    return totalItems;
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
    if (this.isTotalOver200()) {
      this.cartItems.unshift(this.freeItemOver200);
    }
    if (this.isTotalOver300()) {
      this.cartItems.unshift(this.freeItemOver300);
    }
    const orderItems = this.cartItems
      .map((item: CartItem) => {
        return `    ${item.name.toUpperCase()} - ${item.size?.toUpperCase()}${
          item.withExtraCheese ? ' WITH EXTRA CHEESE' : ''
        }${item.withCheeseBurst ? ' WITH CHEESE BURST' : ''} ${
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
    }${encodeURI('\n')}**************************${encodeURI('\n')}OUTLET - ${
      this.selectedOutlet()
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
        window.open(link, '_blank');
        this.clearCart();
        this.navigateToHome();
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
