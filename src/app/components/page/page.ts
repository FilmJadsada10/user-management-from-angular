import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './page.html',
  styleUrl: './page.css'
})
export class Page {

  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() itemsPerPage = 5;
  @Input() itemsPerPageOptions: number[] = [5, 10, 20];

  @Output() pageChanged = new EventEmitter<number>();
  @Output() itemsPerPageChanged = new EventEmitter<number>();


  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

    onItemsPerPageChange(value: number) {
    this.itemsPerPageChanged.emit(+value);
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.pageChanged.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChanged.emit(this.currentPage + 1);
    }
  }
}
