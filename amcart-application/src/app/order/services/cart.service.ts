import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientWrapperService } from 'src/app/core/http-client/http-client-wrapper.service';
import { Enums } from 'src/app/shared/enums/enums';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  baseUrl: string = environment.urlConstant.cartServiceBaseUrl;
  constructor(private http: HttpClientWrapperService) { }

}
