import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  filterTerm: string= '';
  sortOrder: 'asc' | 'desc' = 'asc';

  @Output() filterChanged = new EventEmitter<string>();
  @Output() sortChanged = new EventEmitter<'asc' | 'desc'>();

  onFilterChange(): void {
    this.filterChanged.emit(this.filterTerm!);
  }

  onSortChange(): void {
    this.sortChanged.emit(this.sortOrder);
  }
}
