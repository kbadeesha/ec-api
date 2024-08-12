export class SuccessResponse {
  code = 'SUCCESS' as const;

  message: string;

  status: 200 | 201;

  constructor(message?: string, status?: 200 | 201) {
    this.message = message ?? 'success';
    this.status = status ?? 200;
  }
}
