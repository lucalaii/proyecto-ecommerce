import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    //Cambiar la fecha y hora a la Argentina
    const now = DateTime.now().setZone('America/Argentina/Buenos_Aires');
    console.log(`[${now.toFormat('yyyy-MM-dd HH:mm:ss')}] ${method} ${url}`);
    next();
  }
}
