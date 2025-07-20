import { RoleDto } from './role.model';
import { PermissionReturnDto } from './permission-return.model';

export interface UserDataDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: RoleDto;
  username: string;
  permissions: PermissionReturnDto[];
}
