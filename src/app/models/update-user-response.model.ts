
import { StatusDto } from './status.model';
import { UserDataDto } from './user-data.model';

export interface UpdateUserResponseDto {
  status: StatusDto;
  data: UserDataDto;
}
