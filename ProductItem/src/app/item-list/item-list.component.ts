import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule,FormsModule,HeaderComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  items: any[] = [];
  filteredItems: any[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  filterTerm: string = ''; 
  private apiUrl = 'https://fakestoreapi.com/products';


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.getItems().subscribe(
      (data) => {
        this.items = data;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((data) => {
        return data;
      }),
      catchError((error) => {
        console.error('API request failed', error);
        return of([]); 
      })
    );
  }

  sortItems(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    this.applyFilters();
  }

  filterItems(term: string): void {
    this.filterTerm = term.toLowerCase();
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredItems = this.items
      .filter((item) => {
        const price = !item.price || (this.filterTerm === '' ? item.price.toString().includes(item.price) : item.price.toString().toLowerCase().match(this.filterTerm));
        const matchesTitle = !item.title || (this.filterTerm === '' ? item.title.toLowerCase().includes(item.title.toLowerCase()) : item.title.toString().toLowerCase().match(this.filterTerm));
        const matchesCategory = !item.category || (this.filterTerm === '' ? item.category.toLowerCase().includes(item.category.toLowerCase()) : item.category.toString().toLowerCase().match(this.filterTerm));
        return price || matchesTitle || matchesCategory;
      })
      .sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
  }
  
}
