import { StatusDto } from './status.model';
import { UserDataDto } from './user-data.model';

export interface CreateUserResponseDto {
  status: StatusDto;
  data: UserDataDto[];
}
