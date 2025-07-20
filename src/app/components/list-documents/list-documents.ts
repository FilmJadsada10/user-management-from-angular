import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-documents',
  imports: [FormsModule,CommonModule],
  templateUrl: './list-documents.html',
  styleUrl: './list-documents.css'
})
export class ListDocuments {
    documents = Array(9).fill(0).map(() => ({
    title: 'Lorem ipsum',
    date: 'April 9, 2022',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.'
  }));
}
