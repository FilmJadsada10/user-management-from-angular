
import { PermissionDto } from './permission.model';

export interface UpdateUserRequestDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  roleId: string;
  username: string;
  password: string;
  permissions: PermissionDto[];
}
