import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Documents } from "./pages/documents/documents";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Menu } from "./components/menu/menu";
import { Header } from "./components/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('user-management');
}
