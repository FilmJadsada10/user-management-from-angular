import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserFilterRequestDto } from '../../models/user-filter-request.model';
import { UserTableItemDto } from '../../models/get-users-response.model';
import { AddUser } from '../add-user/add-user';
import { Page } from '../page/page';
import { ListUsers } from '../list-users/list-users';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, AddUser, Page, ListUsers],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {
  users: UserTableItemDto[] = [];

  search: string = '';
  orderBy: string = '';
  orderDirection: 'asc' | 'desc' = 'asc';
  pageNumber: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;
  itemsPerPageOptions = [5, 10, 20, 50];
  isAddUserVisible = false;

  constructor(private userService: UserService) {
    this.loadUsers();
  }


  openAddUser() {
    this.isAddUserVisible = true;
  }

  closeAddUser() {
    this.isAddUserVisible = false;
  }


    // เมธอดเรียกตอนเลือกเมนู
  setSorting(orderBy: string, orderDirection: 'asc' | 'desc') {
    this.orderBy = orderBy;
    this.orderDirection = orderDirection;
  }

  loadUsers(): void {
    const request: UserFilterRequestDto = {
      search: this.search.trim(),
      orderBy: this.orderBy || undefined,
      orderDirection: this.orderDirection,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };

    this.userService.getUsers(request).subscribe({
      next: (res) => {
        this.users = Array.isArray(res.dataSource) ? res.dataSource : [];
        this.totalCount = res.totalCount ?? 0;
      },
      error: (err) => {
        console.error('❌ ดึงข้อมูลไม่สำเร็จ:', err);
        this.users = [];
        this.totalCount = 0;
      },
    });
  }


  onSearch(): void {
    this.pageNumber = 1;
    this.loadUsers();
  }

  onSort(field: string, direction: 'asc' | 'desc'): void {
    this.orderBy = field.toLowerCase();
    this.orderDirection = direction;
    this.pageNumber = 1;
    this.loadUsers();
  }

  onPageChange(newPage: number): void {
    this.pageNumber = newPage;
    this.loadUsers();
  }

  onItemsPerPageChange(newSize: number): void {
    this.pageSize = newSize;
    this.pageNumber = 1;
    this.loadUsers();
  }

  onEditUser(userId: string): void {
    console.log('📝 Edit user ID:', userId);
    // TODO: Open edit modal
  }

  onDeleteUser(userId: string): void {
    console.log('🗑️ Delete user ID:', userId);
    // TODO: Confirm and call delete API
  }
}
