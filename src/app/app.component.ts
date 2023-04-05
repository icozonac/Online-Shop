import { NavigationItem } from './models/category';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'shop';
  navigationList: NavigationItem[] = [
    {
      category: 'electronics',
      subcategories: ['laptops', 'mobiles'],
    },
    {
      category: 'furniture',
      subcategories: ['chairs'],
    },
  ];
}
