export interface EntityErrorResponse {
  status: number;
  code: string;
  message: string;
}

export interface IStatusResponse {
  status: boolean;
  message: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  rowCount: number;
}
