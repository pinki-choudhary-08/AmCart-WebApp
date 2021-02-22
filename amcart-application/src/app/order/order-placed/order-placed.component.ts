import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/shared/model/Address';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { Order } from 'src/app/shared/model/Order';
import { AddressService } from '../services/address.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.css']
})
export class OrderPlacedComponent implements OnInit {

  orderId: string = "";
  totalQuantity: number = 0;
  totalTax: number = 0;
  subTotal: number = 0;
  orderTotal: number = 0;
  addressId!: string;
  products: any;
  userEmail = '';
  userAddress: Address = new Address('', '', '', '', '', '', '', '', false, '', '', 0);

  orderData!: Order;

  constructor(private orderService: OrderService,
              private router: Router,
              private addressService: AddressService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.orderId = this.activatedRoute.snapshot.queryParams.orderId;
      this.addressId = this.activatedRoute.snapshot.queryParams.addressId;
      this.getOrderDetailByOrderId(this.orderId);
      this.getUserDetails();
    });
  }

  getOrderDetailByOrderId(orderId: string): void {
    this.orderService.getOrderDetailById(orderId).subscribe(
      (data: Order) => {
        this.orderData = data;
        this.subTotal = this.calculateSubTotal();
        this.totalQuantity = this.calculateTotalQuantity();
        this.totalTax = this.calculateTotalTax();
        this.orderTotal = this.calculateTotal();
        this.products = this.orderData.products;
        this.getAddressDetail(this.addressId);
      }
    );
  }

  public goToHomePage(): void {
    this.router.navigateByUrl('/home');
  }

  calculateSubTotal(): number {
    let temp = 0;
    this.orderData.products.map(item => temp += (item.price * item.quantity));
    return temp;
  }

  calculateTotalQuantity(): number {
    let temp = 0;
    this.orderData.products.map(item => temp += item.quantity);
    return temp;
  }

  calculateTotalTax(): number {
    return ((this.subTotal) * 5) / 100;
  }

  calculateTotal(): number {
    return this.subTotal + this.totalTax;
  }

  getUserDetails(): void {
    this.userEmail = this.authService.getUserEmail();
  }

  getAddressDetail(addressId: string): void {
    this.userAddress = this.addressService.getAddressesById(addressId, this.authService.getUserEmail());
  }
}
