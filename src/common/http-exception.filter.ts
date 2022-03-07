/**
 * http异常过滤器
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, NotFoundException,
  UnauthorizedException, BadRequestException
} from '@nestjs/common';
import { CannotCreateEntityIdMapError, EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Logger } from '../utils/log4js';
import { GlobalResponseError } from './global.response.error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException>{

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let message = (exception as any).message.message;
    let code: any = 200;
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
          Request original url: ${request.originalUrl}
          Method: ${request.method}
          IP: ${request.ip}`;
    let resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
    switch (exception.constructor) {
      case HttpException:
        message = (exception as HttpException).message;
        code = (exception as HttpException).getStatus();
        resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        logFormat += resStr;
        Logger.info(logFormat);
        break;
      case NotFoundException:
        message = (exception as NotFoundException).message;
        code = (exception as NotFoundException).getStatus();
        resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        logFormat += resStr;
        Logger.info(logFormat);
        break;
      case QueryFailedError:
        message = (exception as QueryFailedError).message;
        code = (exception as any).code;
        resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        logFormat += resStr;
        Logger.info(logFormat);
        break;
      case EntityNotFoundError:
        message = (exception as EntityNotFoundError).message;
        code = (exception as any).code;
        resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        logFormat += resStr;
        Logger.info(logFormat);
        break;
      case CannotCreateEntityIdMapError:
        message = (exception as CannotCreateEntityIdMapError).message;
        code = (exception as any).code;
        resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        logFormat += resStr;
        Logger.info(logFormat);
        break;
      case UnauthorizedException:
        message = (exception as UnauthorizedException).message;
        code = (exception as UnauthorizedException).getStatus();
        resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        logFormat += resStr;
        Logger.info(logFormat);
        break;
      case BadRequestException:
        message = (exception as BadRequestException).message;
        code = (exception as BadRequestException).getStatus();
        resStr = `Status code: ${status}
          Response: ${exception.toString()} \n >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
        logFormat += resStr;
        Logger.info(logFormat);
        break;
      default:
        message = exception.toString();
        break;
    }
    response.status(status).json(GlobalResponseError(status, message, code))
  }
}
