import { StatusDto } from './status.model';
import { PermissionReturnDto } from './permission-return.model';

export interface GetPermissionResponseDto {
  status: StatusDto;
  data: PermissionReturnDto[];
}
