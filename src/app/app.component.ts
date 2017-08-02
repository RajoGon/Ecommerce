import { Component } from '@angular/core';
import{ProductService} from './services/product.service.component';
import{RegisterService} from './services/register.service.component';

@Component({
  selector: 'my-app',
  template: `<navigation></navigation><router-outlet></router-outlet><myfooter></myfooter>`,
  providers:[ProductService,RegisterService]
})
export class AppComponent  { }
