/* eslint-disable @typescript-eslint/no-floating-promises */
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutPopupComponent } from './checkout-popup/checkout-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { NewCartItem, OrderType } from '../../shared/modals';
import { FoodService } from '../../services/food.service';
import { ENV } from '../../../env/env';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private restaurantId: number = 226021;

  private tableNumber: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
  ) {}

  newCartItems: NewCartItem[] = [];

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.newCartItems = this.foodService.getAllCartItems();

    if (!ENV.isProd) {
      this.phoneNumber = '8869860624';
    }

    this.route.queryParamMap.subscribe((params) => {
      this.restaurantId = params.get('restaurant_id')
        ? Number(params.get('restaurant_id'))
        : 0;
      this.tableNumber = params.get('table_number')
        ? Number(params.get('table_number'))
        : -1;
    });
  }

  getTotalAmount() {
    return this.newCartItems.reduce(
      (total, item) => total + item.perItemPrice * item.quantity,
      0,
    );
  }

  getTotalItems() {
    const totalItems = this.newCartItems.reduce(
      (total, item) => total + item.quantity,
      0,
    );
    return totalItems;
  }

  getItemSize(item: NewCartItem) {
    return item.size && item.size.toString().toUpperCase();
  }

  navigateToHome() {
    this.router.navigate(['/digital-menu'], {
      queryParams: {
        restaurant_id: this.restaurantId,
        table_number: this.tableNumber,
      },
    });
  }

  phoneNumber: string = '9119682004';

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
      '\n',
    )}ITEMS DETAILS - ${encodeURI('\n')}${orderItems}${encodeURI(
      '\n',
    )}**************************${encodeURI(
      '\n',
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
    }${encodeURI('\n')}**************************${encodeURI(
      '\n',
    )}RESTAURANT_ID - ${this.restaurantId}${encodeURI('\n')}TABLE_NUMBER - ${
      this.tableNumber
    }`;
  }

  generateWhatsAppLink(orderType: OrderType): string {
    const formattedOrderDetails = this.formatOrderDetails(orderType);

    if (this.restaurantId === 241124) {
      this.phoneNumber = '7518999096';
    }

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
