import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'; 

import { AppComponent }  from './app.component';
import { NavigationComponent }  from './components/navigation-component/navigation.component';
import { LoginComponent }  from './components/navigation-component/login-component/login.component';
import { RegisterComponent }  from './components/navigation-component/register-component/register.component';
import { FooterComponent }  from './components/footer-component/footer.component';


@NgModule({
  imports:      [ BrowserModule,HttpModule ],
  declarations: [ AppComponent,NavigationComponent,LoginComponent,RegisterComponent,FooterComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
