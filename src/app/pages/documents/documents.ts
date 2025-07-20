import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Document } from "../../components/document/document";
import { Header } from "../../components/header/header";
import { ListDocuments } from "../../components/list-documents/list-documents";

@Component({
  selector: 'app-documents',
  imports: [Menu, Document, Header, ListDocuments],
  template: `
  <div class="d-flex">
    <app-menu></app-menu>
    <div class="d-flex flex-column">
        <app-header></app-header>
        <app-document></app-document>
        <app-list-documents></app-list-documents>
    </div>
  </div>`,
  styleUrl: './documents.css'
})
export class Documents {

}
