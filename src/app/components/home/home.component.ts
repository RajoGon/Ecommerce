import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'home',
  templateUrl:'./home.component.html',
  
})
export class HomeComponent {
  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit() {}
 }