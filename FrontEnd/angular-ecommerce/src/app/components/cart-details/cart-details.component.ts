import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // get a handle to cart items
    this.cartItems = this.cartService.cartItems;
    //subscribe to cart titalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );
    //sub to cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
    //compute cart total price & quantity
    this.cartService.computeCartTotals();
  }
  incrementQuantity(theCartItem: CartItem){
    this.cartService.addToCart(theCartItem);
  }
  decrementQuantity(theCartItem: CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }
  remove(theCartItem: CartItem){
    this.cartService.remove(theCartItem);
  }

}
