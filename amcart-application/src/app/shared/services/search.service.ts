import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchOption: IProduct[] = [];
  public productsData: IProduct[] | undefined;
  postUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) { }
  getPosts(): Observable<IProduct[]>{
       return this.http.get<IProduct[]>(this.postUrl);
 }
}
