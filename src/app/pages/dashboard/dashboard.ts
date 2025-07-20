import { Component } from '@angular/core';
import { Menu } from "../../components/menu/menu";
import { Header } from "../../components/header/header";
import { UserDashboard } from "../../components/user-dashboard/user-dashboard";
import { ListUsers } from "../../components/list-users/list-users";
import { Page } from "../../components/page/page";

@Component({
  selector: 'app-dashboard',
  imports: [Menu, Header, UserDashboard],
  template: `
    <div class="d-flex">
      <app-menu></app-menu>
      <div class="d-flex flex-column">
        <app-header></app-header>
        <app-user-dashboard></app-user-dashboard>
      </div>
    </div>
  `,
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
