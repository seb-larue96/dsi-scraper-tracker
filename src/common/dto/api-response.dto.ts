export class ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;

  constructor(data?: T, message = 'Request Successful') {
    this.success = true;
    this.message = message;
    this.data = data;
  }
}