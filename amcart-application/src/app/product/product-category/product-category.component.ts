import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { ICategory } from 'src/app/shared/interfaces/ICategory';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductService } from '../services/product.service';
import { IProduct } from 'src/app/shared/interfaces/IProduct';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/order/services/cart.service';
import { IProductDetail } from 'src/app/shared/interfaces/IProductDetail';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
})
export class ProductCategoryComponent implements OnInit {

  constructor(
    private categoryService: ProductCategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private SpinnerService: NgxSpinnerService,
    private cartService: CartService
  ) { }
  searchBy = '';
  searchValue = '';
  public itemCount = 0;

  categories: ICategory[] = [];
  products: IProduct[] = [];
  minValue = 100;
  maxValue = 400;
  public totalCount = 0;
  public currentPage = 1;
  public totalPage = 0;
  continuationToken = '';
  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> &#8377;' + value;
        case LabelType.High:
          return '<b>Max price:</b> &#8377;' + value;
        default:
          return '&#8377;' + value;
      }
    },
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {

      this.searchBy = this.route.snapshot.queryParams.searchBy;
      this.searchValue = this.route.snapshot.queryParams.searchValue;
      this.search();
      this.cartService.getCartItemsCount().subscribe((item) => {
        this.itemCount = item;
      });
    });
  }

  search(): void {
    if (this.searchBy === 'department') {
      this.categoryService
        .getCategoriesByDepartment(this.searchValue)
        .subscribe((result) => {
          this.categories = result.data;
        });

      this.loadFirstPage();
    }
  }

  loadFirstPage(): void {
    this.SpinnerService.show();
    this.currentPage = 1;
    this.productService
      .getProductsByDepartment(this.searchValue, '')
      .subscribe((result) => {
        this.products = result.data;
        this.totalCount = result.totalCount;
        this.totalPage = Math.ceil(result.totalCount / 15);
        this.continuationToken = result.continuationToken;
        this.SpinnerService.hide();
      });
  }

  goToNextPage(): void {
    this.currentPage++;
    this.productService
      .getProductsByDepartment(this.searchValue, this.continuationToken)
      .subscribe((result) => {
        this.products = result.data;
        this.totalCount = result.totalCount;
        this.totalPage = Math.ceil(result.totalCount / 15);
        this.continuationToken = result.continuationToken;
      });
  }

  public addItemInCart(product: IProduct): void {
    this.productService.getProductByIdAndSKU(product.productId.toString(), product.sku).subscribe(
      (result) => {
        const productObj = this.products.filter((item) => {
          return item.productId === product.productId && item.sku === product.sku;
        });
        this.cartService.incrementAnItems.next(true);
        this.cartService.addItemIntoCart(result, 1).subscribe((cartId) => {
          if (cartId !== undefined && cartId !== null) {
            sessionStorage.setItem('cartId', cartId);
          }
        });
      }
    );
  }
}
