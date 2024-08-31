import { Component } from '@angular/core';

import { ItemListComponent } from "./item-list/item-list.component";
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ItemListComponent, HeaderComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'One Center';
}
