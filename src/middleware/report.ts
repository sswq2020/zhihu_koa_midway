import { Provide, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';

import {
  IMidwayKoaContext,
  IMidwayKoaNext,
  IWebMiddleware,
} from '@midwayjs/koa';

@Provide()
export class ReportMiddleware implements IWebMiddleware {
  @Logger()
  logger: ILogger;

  resolve() {
    return async (ctx: IMidwayKoaContext, next: IMidwayKoaNext) => {
      const startTime = Date.now();
      await next();
      console.log('中间件消耗时间', Date.now() - startTime);
      this.logger.info('测试提供的日志功能');
    };
  }
}
