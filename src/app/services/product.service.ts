import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
  
  private baseUrl="http://localhost:8080/api/products";
  private categoryUrl ="http://localhost:8080/api/product_category";

  constructor(private httpClient: HttpClient) { }



  private getProducts(Url: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(Url).pipe(
      map(response => response._embedded.products)
    );
  }



  getProductPaginate(thePage:number,
                    theSize:number,): Observable<GetResponse>{

    const Url =`${this.baseUrl}?page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponse>(Url);
  }

  getProductListPaginate(thePage:number,
                          theSize:number,
                          categoryId:number): Observable<GetResponse>{

    const pageUrl =`${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${theSize}`;

    return this.httpClient.get<GetResponse>(pageUrl);
  }

  searchProductsPaginate(thePage:number,
                          theSize:number,
                          keyword:string): Observable<GetResponse>{

      const pageUrl =`${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${thePage}&size=${theSize}`;

      return this.httpClient.get<GetResponse>(pageUrl);
  }


  

  getProductGategories() {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=>response._embedded.productCategory)
    )
  }

  getProduct(productId: number) {
    const productUrl:string = `${this.baseUrl}/${productId}`

    return this.httpClient.get<Product>(productUrl)

  }

  
  searchProducts(theKeyword:string): Observable<Product[]> {
    const searchUrl =`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    
    return this.getProducts(searchUrl);
    }
    
  }
    
    interface GetResponse{
  _embedded :{
    products :Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory{
  _embedded :{
    productCategory :ProductCategory[];
  }
}



