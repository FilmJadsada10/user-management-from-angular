import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { UserDataDto } from '../../models/user-data.model';
import { UpdateUserRequestDto } from '../../models/update-user-request.model';
import { UserService } from '../../services/user.service';
import { RoleDto } from '../../models/role.model';
import { PermissionReturnDto } from '../../models/permission-return.model';
import { PermissionDto } from '../../models/permission.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css'
})
export class EditUser {


  @Input() userId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  user: UserDataDto | null = null;

  editUser: UpdateUserRequestDto = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    roleId: '',
    permissions: [],
  };

  currentUserId: string = this.userId;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && this.userId) {
      this.loadUser();
    }
  }

  loadPermissions(): void {
    this.userService.getPermissions().subscribe({
      next: (res) => {
        this.permissions = res;

        for (const permission of this.permissions) {
          const matched = this.user?.permissions.find(
            (p) => p.permissionId === permission.permissionId
          );

          this.permissionStates[permission.permissionId] = {
            permissionId: permission.permissionId,
            isReadable:  false,
            isWritable:  false,
            isDeletable:  false,
          };
        }
      },
      error: (err) => console.error('โหลด permissions ไม่สำเร็จ:', err),
    });
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.user = response.data;

        this.editUser = {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email,
          phone: this.user.phone ?? '',
          username: this.user.username,
          password: '',
          roleId: this.user.role.roleId,
          permissions: [], // จะใส่ทีหลังตอนกด save
        };
        this.loadRoles();  
        this.loadPermissions(); // 👈 เพิ่มตรงนี้
      },
      error: (err) => console.error('โหลดข้อมูล user ไม่สำเร็จ:', err),
    });
  }

    confirmPassword: string = '';

    onSave(): void {

    if (this.editUser.password !== this.confirmPassword) {
    alert('❌ Password และ Confirm password ไม่ตรงกัน');
    return;
  }
    // เตรียม permission array ที่จะส่ง
    this.editUser.permissions = Object.values(this.permissionStates).map(
      (p) => ({
        permissionId: p.permissionId,
        permissionName:
          this.permissions.find((per) => per.permissionId === p.permissionId)
            ?.permissionName ?? '',
        isReadable: p.isReadable,
        isWritable: p.isWritable,
        isDeletable: p.isDeletable,
      })
    );
    console.log('📦 Payload ที่จะส่ง:', this.editUser);
    this.userService.updateUser(this.userId, this.editUser).subscribe({
      next: () => {
        alert('✅ แก้ไขผู้ใช้สำเร็จ');
        this.saved.emit();
        this.close.emit();
      },
      error: (err) => {
        console.error('❌ แก้ไขผู้ใช้ล้มเหลว:', err);
        alert('เกิดข้อผิดพลาด');
      },
    });
  }

  onClose(): void {
    this.close.emit();
  }

  roles: RoleDto[] = [];
  loadRoles() {
    this.userService.getRoles().subscribe({
      next: (res) => (this.roles = res),
      error: (err) => console.error('โหลด roles ไม่สำเร็จ:', err),
    });
  }

  permissions: PermissionReturnDto[] = [];
  permissionStates: { [permissionId: string]: PermissionDto } = {};

  togglePermission(
    permission: PermissionReturnDto,
    type: 'read' | 'write' | 'delete',
    event: Event
  ) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    const id = permission.permissionId;

    if (!this.permissionStates[id]) {
      this.permissionStates[id] = {
        permissionId: id,
        isReadable: false,
        isWritable: false,
        isDeletable: false,
      };
    }

    if (type === 'read') this.permissionStates[id].isReadable = checked;
    if (type === 'write') this.permissionStates[id].isWritable = checked;
    if (type === 'delete') this.permissionStates[id].isDeletable = checked;
  }
}
