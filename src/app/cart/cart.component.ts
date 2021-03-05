import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements AfterViewInit {
  products = [];
  total = 0;

  constructor(
    private http: HttpClient,
  ) { }

  async ngAfterViewInit() {
    this.products = await this.http.get(`https://blackisp.herokuapp.com/products`).toPromise<any>();
    this.getTotal()
  }

  getTotal() {
    
    for(const item of this.products){
      this.total += Number(item.price)
    }
    
    }

}
