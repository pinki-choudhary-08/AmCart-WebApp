import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { Order } from 'src/app/shared/model/Order';
import { ProductShortDetail } from 'src/app/shared/model/ProductShortDetail';
import { ProductShortDetailOrder } from 'src/app/shared/model/ProductShortDetailOrder';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.css']
})
export class ReviewOrderComponent implements OnInit {
  public cartSubTotal = 0;
  public totalAmount = 0;
  @Output() selectedTabChanged = new EventEmitter<number>();
  @Input() paymentType: number | undefined;

  @Input() productInfo!: ProductShortDetail[];

  @Input()
  totalCount!: number;

  orderData: Order = new Order(
    //   '64a95a8e-7135-4084-86a6-df0088f22776',
    //   '',
    //   'bilingIdTest',
    //   'receipentaddressIdTest',
    //   'newcustomeridtest',
    //   'INVdata',
    //   [
    //     {
    //       productId: "productIdTest",
    //       sku: "skuTest",
    //       quantity: 3,
    //       media: [
    //         {
    //           thumbnailUrl: "../../../assets/images/product/category/mens/full-tshirt.jpg",
    //           baseUrl: "../../../assets/images/product/category/mens/full-tshirt.jpg"
    //         }
    //       ],
    //       features: {
    //         color: "black",
    //         size: "l"
    //       },
    //       price: '1000',
    //       title: '',
    //       brand: '',
    //       cartQuantity: 0
    //     }

    //   ]
  );

  paymentInfoType = '';
  constructor(private orderService: OrderService,
              private router: Router,
              private spinnerService: NgxSpinnerService,
              private authService: AuthService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.getPaymentInfoDetail();
  }

  public createNewOrder(orderData: Order): void {
    const orderData = this.toDto();
    this.spinnerService.show();
    this.orderService.createOrder(orderData).subscribe(
      (data: string) => {
        console.log(data);
        this.spinnerService.hide();
        const navigationExtras = {
          queryParams: {
            orderId: data
          }
        };
        this.cartService.resetCart(orderData.customerId).subscribe();
        this.router.navigate(['/ordercomplete'], navigationExtras);
      }
    );
  }

  private toDto(): Order {
    const orderData = new Order();
    orderData.billingAddressId = 'sada';
    orderData.customerId = this.authService.getUserEmail();
    orderData.invoiceNumber = '';
    orderData.promotionId = '';
    orderData.receipentAddressId = '';
    const productList: ProductShortDetailOrder[] = [];
    this.productInfo.forEach((product) => {
      const productObj = new ProductShortDetailOrder();
      productObj.features = product.features;
      productObj.media = product.media;
      productObj.price = parseFloat(product.price);
      productObj.productId = product.productId;
      productObj.quantity = product.quantity;
      productObj.sku = product.sku;
      productObj.tax = parseFloat(product.price) * product.quantity * 0.05;
      productList.push(productObj);
    });
    orderData.products = productList;
    return orderData;
  }

  placeOrder(): void {
    this.createNewOrder(this.orderData);
  }

  onCancel(): void {
    this.router.navigateByUrl('/home');
  }

  getPaymentInfoDetail(): void {
    console.log(this.paymentType);
    if (this.paymentType === 0) {
      this.paymentInfoType = 'Cash on Delivery';
    } else if (this.paymentType === 1) {
      this.paymentInfoType = 'Pay By Check';
    } else if (this.paymentType === 2) {
      this.paymentInfoType = 'Online banking';
    } else {
      this.paymentInfoType = 'Pay by card';
    }
  }

  onBackClick(): void {
    this.selectedTabChanged.emit(1);
  }
  public subTotalValue(price: string, quantity: number): string {
    return (parseFloat(price) * quantity).toString();
  }
}
