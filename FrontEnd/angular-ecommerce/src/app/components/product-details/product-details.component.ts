import { CartItem } from './../../common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private ProductService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
        this.handleProductDetails();
    })
  }
  handleProductDetails() {
    // get id param string and convert it to a number using "+"
    const theProductId: number = +this.route.snapshot.paramMap.get('id');
    this.ProductService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  addToCart(){
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
