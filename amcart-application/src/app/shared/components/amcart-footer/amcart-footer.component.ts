import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-amcart-footer',
  templateUrl: './amcart-footer.component.html',
  styleUrls: ['./amcart-footer.component.css']
})
export class AmcartFooterComponent implements OnInit {

  applicationName = "Amcart Portal";
  constructor() { }

  ngOnInit(): void {
  }

}
