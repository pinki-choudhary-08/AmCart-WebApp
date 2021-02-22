import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { ProductService } from 'src/app/product/services/product.service';
import { IProductDetail } from 'src/app/shared/interfaces/IProductDetail';
import { CartDetail } from 'src/app/shared/model/CartDetail';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private customerId = '';
  public cartDetailObj = new CartDetail();
  public cartSubTotal = 0;
  public totalAmount = 0;
  public productDetails: IProductDetail[] = [];
  public radix = 3;

  constructor(private cartService: CartService,
              private authService: AuthService,
              private productService: ProductService,
              private SpinnerService: NgxSpinnerService,
              private router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  private getCartDetails(): void {
    this.customerId =  this.authService.getUserEmail();
    if (this.customerId !== undefined) {
      this.SpinnerService.show();
      this.cartService.getCartDetailByCustomerId(this.customerId).subscribe((result) => {
        this.cartDetailObj = result;
        result?.productInfo.forEach((item) => {
          this.cartSubTotal += (item.quantity * parseInt(item.price, this.radix));
          this.totalAmount = this.cartSubTotal + this.cartSubTotal * 0.05;
          this.productService.getProductByIdAndSKU(item.productId.toString(), item.sku).subscribe((data) => {
            this.productDetails.push(data);
            this.SpinnerService.hide();
          });
        });
        this.SpinnerService.hide();
      });
    }
  }

  public incrementCount(productId: string, increment: number): void {
    this.cartDetailObj.productInfo.forEach((item) => {
      if (item.productId === productId) {
        ++item.quantity;
        this.cartSubTotal += parseInt(item.price, this.radix);
        this.totalAmount = this.cartSubTotal + this.cartSubTotal * 0.05;
        this.cartService.incrementAnItems.next(true);
        this.addItemInCart(item.productId, item.sku, increment);
      }
    });
  }

  public decrementCount(productId: string, decrement: number): void {
    this.cartDetailObj.productInfo.forEach((item) => {
      if (item.productId === productId && item.quantity > 0) {
        --item.quantity;
        this.cartSubTotal -= parseInt(item.price, this.radix);
        this.totalAmount = this.cartSubTotal + this.cartSubTotal * 0.05;
        this.cartService.incrementAnItems.next(false);
        this.addItemInCart(item.productId, item.sku, decrement);
      }
    });
  }
  private addItemInCart(productId: string, sku: string, increment: number): void {
    const productDetails = this.productDetails.filter((product) => {
      return product.productId === productId && product.sku === sku;
    });
    this.cartService.addItemIntoCart(productDetails[0], increment).subscribe((cartId: string) => {
    });
  }

  public redirectToCheckout(): void {
    // const navigationExtras = {
    //   queryParams: {
    //     customerId: profile !== undefined ? profile.emails[0] : ''
    //   }
    // };
    this.router.navigateByUrl('/checkout');
  }
  public removeProductFromCart(productId: string, sku: string): void {
    const filteredCartObj = this.cartDetailObj.productInfo.filter((item) => {
      return item.productId !== productId && item.sku !== sku;
    });
    const removedObject = this.cartDetailObj.productInfo.filter((item) => {
      return item.productId === productId && item.sku === sku;
    });
    this.cartDetailObj.productInfo = filteredCartObj;
    for (let item = 0; item < removedObject[0].quantity; item++) {
      this.cartService.incrementAnItems.next(false);
      this.cartSubTotal -= parseInt(removedObject[0].price, this.radix);
      this.totalAmount = this.cartSubTotal + this.cartSubTotal * 0.05;
    }
    const productDetail = this.productDetails.filter((product) => {
      return product.productId === productId && product.sku === sku;
    })[0];
    this.cartService.addItemIntoCart(productDetail, -(removedObject[0].quantity)).subscribe((cartId: string) => {
    });
  }
  public subTotalValue(price: string, quantity: number): string {
    return (parseFloat(price) * quantity).toString();
  }
}
