
import { RoleDto } from './role.model';
import { PermissionReturnDto } from './permission-return.model';

export interface UserTableItemDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: RoleDto;
  username: string;
  permissions: PermissionReturnDto[];
  createdDate: string;
}

export interface GetUsersResponseDto {
  dataSource: UserTableItemDto[];
  page: number;
  pageSize: number;
  totalCount: number;
}
