import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { IProductDetail } from 'src/app/shared/interfaces/IProductDetail';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  quantity = 1;
  product: IProductDetail = {
    id: '468b039b-011e-461f-847f-ef6da402963b',
    productId: '1243',
    shortDescription: 'Winter pants',
    longDescription: 'Winter woolean pants',
    superCategory: ['Winter Wear', 'Pants'],
    title: `Men's Winter Pants`,
    department: 'men',
    brand: 'Tommy',
    sku: '1235',
    quantity: 200,
    price: '2000.00',
    createDate: new Date('2021-01-24T18:26:15.8773134Z'),
    modifiedDate: new Date('2021-01-24T18:26:15.8773165Z'),
    media: [
      {
        thumbnailUrl:
          '../../../assets/images/product/category/mens/full-tshirt.jpg',
        baseUrl: '../../../assets/images/product/category/mens/full-tshirt.jpg',
      },
    ],
    features: {
      color: 'black',
      size: 'l',
    },
  };
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getProductDetail(
      this.route.snapshot.params.id,
      this.route.snapshot.params.skuId
    );
  }

  getProductDetail(productId: string, sku: string): void {
    this.SpinnerService.show();
    this.productService
      .getProductByIdAndSKU(productId, sku)
      .subscribe((result) => {
        this.product = result;
        this.SpinnerService.hide();
      });
  }

  increaseCount(): void {
    if (this.quantity < 5) {
      this.quantity += 1;
    }
  }

  decreaseCount(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addToCart(productId: string, sku: string): void {}
}
