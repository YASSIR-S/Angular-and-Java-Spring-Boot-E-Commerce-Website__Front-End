import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  

  products: Product[] = [];
  currentCategoryId : number = 1;
  previousCategoryId: number=1;
  searchMode: boolean = false;
  categoryMode:boolean=false;

  previousKeyword:string="";

  //page
  thePageNumber:number = 1;
  thePageSize:number =10;
  theTotalElements:number=0;


  constructor(private productService: ProductService,
              private cartService: CartService,
              private route:ActivatedRoute ){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{

      this.listProducts();
    })
  }

  listProducts(){

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    this.categoryMode=this.route.snapshot.paramMap.has('id');


    if(this.searchMode){
    this.handleSearchProducts();

    }
    if(this.categoryMode){
      this.handleListProducts();
    }
    else{
      this.handleHomeProducts();
    }

  }
  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword != theKeyword){
      this.thePageNumber=1;

    }
    this.previousKeyword = theKeyword;

    console.log(`page = ${this.thePageNumber} , keyword = ${theKeyword}` )

    this.productService.searchProductsPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                theKeyword).subscribe(
                                                  data => {
                                                    this.products = data._embedded.products,
                                                    this.thePageNumber= data.page.number +1,
                                                    this.thePageSize=data.page.size,
                                                    this.theTotalElements=data.page.totalElements;
                                                  }
                                                  );

  }

  handleHomeProducts(){
    this.productService.getProductPaginate(this.thePageNumber -1,
                                          this.thePageSize)
                                          .subscribe(
                                            data=>{
                                              this.products = data._embedded.products,
                                              this.thePageNumber= data.page.number +1,
                                              this.thePageSize=data.page.size,
                                              this.theTotalElements=data.page.totalElements;

                                          
                                            }
                                          )
  }
  
  handleListProducts(){


    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
        this.currentCategoryId = +idParam;
    } else {
        this.currentCategoryId = 1;
    }
    
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber=1;
    }
    this.previousCategoryId=this.currentCategoryId;

    console.log(`current Catergoty Id= ${this.currentCategoryId}, the Page number =${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber -1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(
                                                data => {
                                                  this.products = data._embedded.products,
                                                  this.thePageNumber= data.page.number +1,
                                                  this.thePageSize=data.page.size,
                                                  this.theTotalElements=data.page.totalElements;
                                                }
                                                );

  }

  updatePageSize(pageSize: string) {
    this.thePageSize=+pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }


  processData(){
    return (data: any) => {
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number +1;
      this.thePageSize=data.page.size;
      this.theTotalElements= data.page.totalElements;
    };
  }


  addToCart(product: Product){

    console.log("name " +product.name + "price: " + product.unitPrice);

    const theCartItem = new CartItem(product);

    this.cartService.addToCart(theCartItem);

  }



}
