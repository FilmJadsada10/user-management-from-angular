
export interface UserFilterRequestDto {
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}
