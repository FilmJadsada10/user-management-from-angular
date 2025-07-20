import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { CreateUserRequestDto } from '../models/create-user-request.model';
import { RoleDto } from '../models/role.model';
import { PermissionReturnDto } from '../models/permission-return.model';
import { GetRoleResponseDto } from '../models/get-role-response.model';
import { GetPermissionResponseDto } from '../models/get-permission-response.model';
import { UserFilterRequestDto } from '../models/user-filter-request.model';
import { GetUsersResponseDto } from '../models/get-users-response.model';
import { GetUserByIdResponseDto } from '../models/get-user-by-id-response.model';
import { DeleteUserResponseDto } from '../models/delete-user-response.model';
import { UpdateUserResponseDto } from '../models/update-user-response.model';
import { UpdateUserRequestDto } from '../models/update-user-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5065/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: CreateUserRequestDto): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  getRoles(): Observable<RoleDto[]> {
    return this.http.get<GetRoleResponseDto>('http://localhost:5065/api/roles')
      .pipe(map(res => res.data));
  }

  getPermissions(): Observable<PermissionReturnDto[]> {
    return this.http.get<GetPermissionResponseDto>('http://localhost:5065/api/permissions')
      .pipe(map(res => res.data));
  }

  
  getUserById(userId: string): Observable<GetUserByIdResponseDto> {
    return this.http.get<GetUserByIdResponseDto>(`${this.baseUrl}/${userId}`);
  }

  getUsers(request: UserFilterRequestDto): Observable<GetUsersResponseDto> {
    return this.http.post<GetUsersResponseDto>(`${this.baseUrl}/DataTable`, request);
  }
  deleteUser(userId: string): Observable<DeleteUserResponseDto> {
    const url = `${this.baseUrl}/${userId}`; // เปลี่ยนเป็น URL จริงของคุณ
    return this.http.delete<DeleteUserResponseDto>(url);
  }

  updateUser(
    userId: string,
    user: UpdateUserRequestDto
  ): Observable<UpdateUserResponseDto> {
    return this.http.put<UpdateUserResponseDto>(`${this.baseUrl}/${userId}`, user);
  }
}
