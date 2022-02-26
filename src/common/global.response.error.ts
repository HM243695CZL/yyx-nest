import { IResponseError } from './response.error.interface';
export const GlobalResponseError: (
  statusCode: number,
  message: string, code: any
) => IResponseError = (
  statusCode: number,
  message: string,
  code: any
): IResponseError => {
  return {
    statusCode,
    message,
    code
  }
};
