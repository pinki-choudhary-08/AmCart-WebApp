import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  baseUrl: string = "https://localhost:44311/api/cart/";
  constructor(private http: HttpClientWrapperService) { }

}
