import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.css']
})
export class BannerCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    // Slider Images
    imageSlides = [
      {'image': 'assets/images/image1.jpg'},
      {'image': 'assets/images/image2.jpg'},
      {'image': 'assets/images/image3.jpg'},
      {'image': 'assets/images/image4.jpg'},
      {'image': 'assets/images/image5.jpg'},
      {'image': 'assets/images/image6.jpg'},
      {'image': 'assets/images/image7.jpg'},
      {'image': 'assets/images/image8.jpg'}
    ];

}
