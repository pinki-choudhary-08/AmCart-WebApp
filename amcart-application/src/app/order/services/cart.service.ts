import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { HttpRequestType} from 'src/app/shared/enums/enums';
import { environment } from 'src/environments/environment';
import { IProductDetail } from 'src/app/shared/interfaces/IProductDetail';
import { CartDetail } from 'src/app/shared/model/CartDetail';
import { CartServiceHelper } from './helpers/cart-service.helper';
import { AuthService } from 'src/app/core/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  baseUrl: string = environment.urlConstant.cartServiceBaseUrl;
  public incrementAnItems = new Subject<boolean>();
  constructor(private http: HttpClientWrapperService,
    private authService: AuthService) { }

  public addItemIntoCart(productDetail: IProductDetail, cartQuantity: number): Observable<string> {
    const cartId = sessionStorage.getItem('cartId') as string
    const customerId = this.authService.getUserEmail();
    const inputDto = CartServiceHelper.toDTO(productDetail, customerId, cartId, cartQuantity);
    const options = { responseType: 'text' as 'json' };
    return this.http.request<string>(this.baseUrl, HttpRequestType.post, inputDto, options);
  }

  public updateCartDetails(cartInput: CartDetail): Observable<string>{
    const options = { responseType: 'text' as 'json' };
    return this.http.request<string>(this.baseUrl, HttpRequestType.post, cartInput, options);
  }

  public getCartDetailByCustomerId(customerId: string): Observable<CartDetail> {
    return this.http.request<CartDetail>(`${this.baseUrl}/customer/${customerId}`, HttpRequestType.get);
  }

  public getCartItemsCount(): Observable<number> {
    const profile = JSON.parse(sessionStorage.getItem('profile') as string);
    if (profile !== null) {
      return this.http.request<number>(`${this.baseUrl}/cartItemCount/${profile.emails[0]}`, HttpRequestType.get);
    }
    return of();
  }

  public resetCart(customerId: string): Observable<CartDetail> {
    return this.http.request<any>(`${this.baseUrl}/resetCart/${customerId}`, HttpRequestType.put);
  }
}
