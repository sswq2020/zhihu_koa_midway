import { Provide, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import jsonwebtoken = require('jsonwebtoken');
import {
  IMidwayKoaContext,
  IMidwayKoaNext,
  IWebMiddleware,
} from '@midwayjs/koa';
import { secret } from '../config/config.default';

@Provide()
export class AuthMiddleware implements IWebMiddleware {
  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      const { authorization = '' } = ctx.request.header;
      const token = authorization.replace('Bearer ', '');
      this.logger.info('执行了中间件');
      try {
        const user = jsonwebtoken.verify(token, secret);
        ctx.state.user = user;
      } catch (error) {
        this.logger.info(error.message);
        ctx.throw(401, error);
      }
      await next();
    };
  }

  @Logger()
  logger: ILogger;
}
