import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  orderId: string="";
  totalQuantity: number=0;
  totalTax: number=0;
  subTotal: number=0;
  orderTotal: number=0;
  products:any;
  userEmail: string="";
  userAddress: Address = new Address("", "", "", "", "", "", "","", false, "", "", 0);
  
  orderData:Order = new Order(
    "64a95a8e-7135-4084-86a6-df0088f22776",
    "",
    "bilingIdTest",
    "receipentaddressIdTest",
    "newcustomeridtest",
    "INVdata",
    [
      {
        productId : "productIdTest",
        sku: "skuTest",
        quantity : 3,
        media: [
          {
              thumbnailUrl: "../../../assets/images/product/category/mens/full-tshirt.jpg",
              baseUrl: "../../../assets/images/product/category/mens/full-tshirt.jpg"
          }
      ],
        features:{
          color: "black",
          size:"l"
        },
        price:1000,
        tax:500,
        shortDescription:"We can describe it shortly"
      }
      
    ]
  );

  constructor(private orderService:OrderService,
              private router:Router,
              private addressService: AddressService,
              private authService: AuthService)
              { }

  ngOnInit(): void {
    this.orderId = history.state.orderId;
    this.getOrderDetailByOrderId(this.orderId);
    this.getUserDetails();
    this.getAddressDetail();
  }

  getOrderDetailByOrderId(orderId:string){
    this.orderService.getOrderDetailById(orderId).subscribe(
      (data: Order) =>{
        this.orderData = data;
      }
    )
    this.subTotal=this.calculateSubTotal();
    this.totalQuantity = this.calculateTotalQuantity();
    this.totalTax = this.calculateTotalTax();
    this.orderTotal = this.calculateTotal();
    this.products = this.orderData.products;
  }
  goToHomePage(){
    this.router.navigateByUrl("/home")
  }

  calculateSubTotal():number {
    let temp:number =0;
    this.orderData.products.map(item => temp +=(item.price * item.quantity));
    return temp;
  } 

  calculateTotalQuantity():number {
    let temp:number =0;
    this.orderData.products.map(item => temp +=item.quantity);
    return temp;
  }

  calculateTotalTax(): number {
    return ((this.subTotal)*5)/100;
  }

  calculateTotal():number {
    return this.subTotal+this.totalTax;
  }

  getUserDetails(){
    this.userEmail =this.authService.getUserEmail()
  }

  getAddressDetail(){
    this.addressService.getAddresses("6bae6da9-2717-41d0-bda0-98480770c9db");
  }
}
