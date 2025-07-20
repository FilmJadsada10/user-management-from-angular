import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CreateUserRequestDto } from '../../models/create-user-request.model';
import { RoleDto } from '../../models/role.model';
import { PermissionReturnDto } from '../../models/permission-return.model';
import { PermissionDto } from '../../models/permission.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
})
export class AddUser {
  @Output() close = new EventEmitter<void>();

  // ฟอร์มหลักที่ผูกกับ ngModel
  user: CreateUserRequestDto = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roleId: '',
    username: '',
    password: '',
    permissions: []
  };

  confirmPassword: string = '';

  // เก็บ role / permission ที่ดึงจาก backend
  roles: RoleDto[] = [];
  permissions: PermissionReturnDto[] = [];

  // เก็บสถานะ checkbox ของแต่ละ permission
  permissionStates: { [permissionId: string]: PermissionDto } = {};

  constructor(private userService: UserService) {
    this.loadRoles();
    this.loadPermissions();
  }

  // 🔹 ปิด modal
  onClose() {
    this.close.emit();
  }

  // 🔹 โหลด roles จาก backend
  loadRoles() {
    this.userService.getRoles().subscribe({
      next: res => this.roles = res,
      error: err => console.error('โหลด roles ไม่สำเร็จ:', err)
    });
  }

  // 🔹 โหลด permissions จาก backend
  loadPermissions() {
    this.userService.getPermissions().subscribe({
      next: res => this.permissions = res,
      error: err => console.error('โหลด permissions ไม่สำเร็จ:', err)
    });
  }

  // 🔹 เมื่อกด Add User
  onAddUser() {
  // ตรวจสอบว่า password กับ confirmPassword ตรงกัน
  if (this.user.password !== this.confirmPassword) {
    alert('❌ Password และ Confirm password ไม่ตรงกัน');
    return;
  }

  // ✅ เตรียม permission ที่ถูกติ๊กไว้
  this.user.permissions = Object.values(this.permissionStates);

  //  เรียก API เพื่อเพิ่มผู้ใช้
  this.userService.createUser(this.user).subscribe({
    next: res => {
      console.log('✅ เพิ่มผู้ใช้สำเร็จ:', res);
      alert('✅ เพิ่มผู้ใช้สำเร็จ');  // ✅ เพิ่มบรรทัดนี้เพื่อให้มี popup แจ้งเตือน
      this.onClose(); // ✅ ปิด modal
    },
    error: err => {
      console.error('❌ เพิ่มผู้ใช้ล้มเหลว:', err);
      alert('❌ เพิ่มผู้ใช้ล้มเหลว กรุณาลองใหม่อีกครั้ง'); // เพิ่มการแจ้งเตือนเมื่อ error
    }
  });
}


  togglePermission(permission: PermissionReturnDto, type: 'read' | 'write' | 'delete', event: Event) {
  const target = event.target as HTMLInputElement;
  const checked = target.checked;
  const id = permission.permissionId;

    if (!this.permissionStates[id]) {
      this.permissionStates[id] = {
        permissionId: id,
        isReadable: false,
        isWritable: false,
        isDeletable: false
      };
    }

    if (type === 'read') this.permissionStates[id].isReadable = checked;
    if (type === 'write') this.permissionStates[id].isWritable = checked;
    if (type === 'delete') this.permissionStates[id].isDeletable = checked;
  }

}
