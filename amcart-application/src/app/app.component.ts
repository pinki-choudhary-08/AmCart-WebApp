import { Component } from '@angular/core';
import { AuthService } from './core/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Amcart';

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

  ngOnDestroy(): void {}

  
}
