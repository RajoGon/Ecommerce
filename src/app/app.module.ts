import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; 
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent }  from './app.component';
import { NavigationComponent }  from './components/navigation-component/navigation.component';
import { LoginComponent }  from './components/navigation-component/login-component/login.component';
import { RegisterComponent }  from './components/navigation-component/register-component/register.component';
import { FooterComponent }  from './components/footer-component/footer.component';
import { HomeComponent }  from './components/home/home.component';
import { CategoryComponent }  from './components/home/category-component/category.component';
import { AdvancedSearchComponent }  from './components/home/advanced-search-component/advanced.search.component';
import { ProductDisplayComponent }  from './components/home/product-display-component/product.display.component';
import { MyAccountComponent }  from './components/myaccount/myaccount.component';
import { ProductViewComponent }  from './components/product-view/product.view.component';



@NgModule({
  imports:      [ BrowserModule,FormsModule,HttpModule,RouterModule.forRoot([
                                                                  {path: '', component: HomeComponent},
                                                                  {path: 'myaccount', component: MyAccountComponent},
                                                                  {path: 'productview', component: ProductViewComponent}
                                                                  ])
                ],
  declarations: [ AppComponent,NavigationComponent,LoginComponent,
                  RegisterComponent,FooterComponent,HomeComponent,
                  CategoryComponent,AdvancedSearchComponent,ProductDisplayComponent,
                  MyAccountComponent,ProductViewComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
