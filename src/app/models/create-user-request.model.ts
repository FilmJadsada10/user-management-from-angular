import { PermissionDto } from './permission.model';

export interface CreateUserRequestDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
  username: string;
  password: string;
  permissions: PermissionDto[];
}
