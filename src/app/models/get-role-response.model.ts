import { StatusDto } from './status.model';
import { RoleDto } from './role.model';

export interface GetRoleResponseDto {
  status: StatusDto;
  data: RoleDto[];
}
