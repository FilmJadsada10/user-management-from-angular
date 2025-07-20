import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserTableItemDto } from '../../models/get-users-response.model';
import { UserService } from '../../services/user.service';
import { EditUser } from "../edit-user/edit-user";

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, EditUser],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css'
})
export class ListUsers {
  @Input() users: UserTableItemDto[] = [];

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear()-543;
    return `${day} ${month}, ${year}`; // "19 Dec, 2022"
  }

  constructor(private userService: UserService) {}
  onDelete(userId: string) {
    // this.delete.emit(userId);
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        if (response.data.result) {
          // ลบ user จาก list
          this.users = this.users.filter((user) => user.userId !== userId);
          alert(response.data.message);
        } else {
          alert('Delete failed: ' + response.data.message);
        }
      },
      error: (error) => {
        console.error('Delete failed:', error);
        alert('An error occurred while deleting the user.');
      },
    });
  }

  selectedUserId: string | null = null;
  // ตอนเเรกมีเเค่ this.selectedUserId = userId; อย่างเดียวในเมธอด เเล้วก็ต้องไปพเิ่มที่ปุ่ม button ด้วย  data-bs-toggle="modal"  data-bs-target="#editModal"
  onEdit(userId: string): void {
    this.selectedUserId = userId; // ส่งไปยัง EditUserComponent
  }

  onCloseModal(): void {
    this.selectedUserId = null;
  }

  getBadgeClass(name: string | undefined): string {
    if (!name) return '';
    return 'badge-' + name.toLowerCase().replace(/ /g, '-');
  }
}
