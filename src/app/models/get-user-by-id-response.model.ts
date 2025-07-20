
import { StatusDto } from './status.model';
import { UserDataDto } from './user-data.model';

export interface GetUserByIdResponseDto {
  status: StatusDto;
  data: UserDataDto;
}
