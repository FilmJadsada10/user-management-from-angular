
import { StatusDto } from './status.model';

export interface DeleteResultDto {
  result: boolean;
  message: string;
}

export interface DeleteUserResponseDto {
  status: StatusDto;
  data: DeleteResultDto;
}
